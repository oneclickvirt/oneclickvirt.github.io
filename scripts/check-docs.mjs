import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(rootDir, 'docs');
const publicDir = path.join(docsDir, 'public');
const siteOrigin = 'https://www.spiritlhl.net';

const errors = [];

function toPosix(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/');
}

function readText(filePath) {
  return readFileSync(filePath, 'utf8');
}

function walk(dir, predicate = () => true) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const relative = toPosix(fullPath);

    if (
      relative === 'node_modules' ||
      relative === 'docs/.vitepress/dist' ||
      relative === 'docs/.vitepress/.temp' ||
      relative === 'docs/.vitepress/cache'
    ) {
      continue;
    }

    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath, predicate));
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripHashAndQuery(rawTarget) {
  return rawTarget.split('#')[0].split('?')[0];
}

function normalizeTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  const angleMatch = trimmed.match(/^<([^>]+)>/);
  const withoutTitle = angleMatch ? angleMatch[1] : trimmed.split(/\s+/)[0];

  try {
    return decodeURIComponent(withoutTitle);
  } catch {
    return withoutTitle;
  }
}

function isExternalTarget(target) {
  return /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(target);
}

function fileExists(candidate) {
  return existsSync(candidate) && statSync(candidate).isFile();
}

function routeCandidates(route) {
  const cleanRoute = stripHashAndQuery(route);
  const candidates = [];

  if (!cleanRoute || cleanRoute === '/') {
    return [path.join(docsDir, 'index.md')];
  }

  if (cleanRoute.startsWith('/')) {
    const routeWithoutSlash = cleanRoute.slice(1);
    const publicCandidate = path.join(publicDir, routeWithoutSlash);

    if (cleanRoute.endsWith('/')) {
      candidates.push(path.join(docsDir, routeWithoutSlash, 'index.md'));
      candidates.push(path.join(publicDir, routeWithoutSlash, 'index.html'));
    } else if (cleanRoute.endsWith('.html')) {
      candidates.push(path.join(docsDir, `${routeWithoutSlash.slice(0, -5)}.md`));
    } else if (path.extname(cleanRoute)) {
      candidates.push(path.join(docsDir, routeWithoutSlash));
      candidates.push(publicCandidate);
    } else {
      candidates.push(path.join(docsDir, `${routeWithoutSlash}.md`));
      candidates.push(path.join(docsDir, routeWithoutSlash, 'index.md'));
      candidates.push(publicCandidate);
    }
  }

  return candidates;
}

function relativeCandidates(sourceFile, target) {
  const cleanTarget = stripHashAndQuery(target);

  if (!cleanTarget || cleanTarget.startsWith('#')) {
    return [];
  }

  const resolved = path.resolve(path.dirname(sourceFile), cleanTarget);

  if (cleanTarget.endsWith('/')) {
    return [path.join(resolved, 'index.md')];
  }

  if (cleanTarget.endsWith('.html')) {
    return [`${resolved.slice(0, -5)}.md`];
  }

  if (path.extname(cleanTarget)) {
    return [resolved];
  }

  return [`${resolved}.md`, path.join(resolved, 'index.md')];
}

function validateTarget(sourceFile, rawTarget, label) {
  const target = normalizeTarget(rawTarget);

  if (!target || target.startsWith('#') || isExternalTarget(target)) {
    return;
  }

  const candidates = target.startsWith('/')
    ? routeCandidates(target)
    : relativeCandidates(sourceFile, target);

  if (!candidates.length || candidates.some(fileExists)) {
    return;
  }

  errors.push(`${toPosix(sourceFile)}: missing ${label} target "${rawTarget}"`);
}

function validateMarkdownTargets() {
  const markdownFiles = walk(docsDir, (filePath) => filePath.endsWith('.md'));
  const markdownLinkPattern = /!?\[[^\]]*?\]\(([^)\n]+)\)/g;
  const htmlSrcPattern = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g;
  const frontmatterLinkPattern = /^\s*link:\s*["']?([^"'\s]+)["']?\s*$/gm;

  for (const file of markdownFiles) {
    const content = readText(file);
    const frontmatterBlock = getFrontmatterBlock(content);

    for (const match of content.matchAll(markdownLinkPattern)) {
      validateTarget(file, match[1], 'Markdown link');
    }

    for (const match of content.matchAll(htmlSrcPattern)) {
      validateTarget(file, match[1], 'HTML image');
    }

    if (frontmatterBlock) {
      for (const match of frontmatterBlock.matchAll(frontmatterLinkPattern)) {
        validateTarget(file, match[1], 'frontmatter link');
      }
    }
  }
}

function validateConfigLinks() {
  const configFile = path.join(docsDir, '.vitepress', 'config.mts');
  const content = readText(configFile);
  const linkPattern = /\blink:\s*'([^']+)'/g;
  const pathPattern = /\bpath:\s*'([^']+)'/g;

  for (const match of content.matchAll(linkPattern)) {
    validateTarget(configFile, match[1], 'VitePress link');
  }

  for (const match of content.matchAll(pathPattern)) {
    validateTarget(configFile, match[1], 'VitePress path');
  }
}

function validateJsonFile(file) {
  try {
    return JSON.parse(readText(file));
  } catch (error) {
    errors.push(`${toPosix(file)}: invalid JSON (${error.message})`);
    return null;
  }
}

function collectStrings(value, strings = []) {
  if (typeof value === 'string') {
    strings.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, strings);
    }
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      collectStrings(item, strings);
    }
  }

  return strings;
}

function getFrontmatterBlock(content) {
  if (!content.startsWith('---\n')) {
    return '';
  }

  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    return '';
  }

  return content.slice(4, end);
}

function parseSimpleFrontmatter(file) {
  const frontmatterBlock = getFrontmatterBlock(readText(file));

  if (!frontmatterBlock) {
    return {};
  }

  const frontmatter = {};
  const lines = frontmatterBlock.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      frontmatter[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }

  return frontmatter;
}

function validatePublicJsonAndUrls() {
  const jsonFiles = [
    path.join(rootDir, 'package.json'),
    path.join(rootDir, 'tsconfig.json'),
    ...walk(path.join(publicDir, '.well-known'), (filePath) => {
      const name = path.basename(filePath);
      return name.endsWith('.json') || name === 'api-catalog' || name === 'http-message-signatures-directory';
    }),
  ];

  for (const file of jsonFiles) {
    const data = validateJsonFile(file);
    if (!data) {
      continue;
    }

    for (const value of collectStrings(data)) {
      if (!value.startsWith(siteOrigin)) {
        continue;
      }

      const url = new URL(value);
      const candidates = routeCandidates(url.pathname);
      if (!candidates.some(fileExists) && url.pathname !== '/sitemap.xml') {
        errors.push(`${toPosix(file)}: site URL does not map to a local route: ${value}`);
      }
    }
  }
}

function validateApiCatalog() {
  const apiCatalogFile = path.join(publicDir, '.well-known', 'api-catalog');
  const apiCatalog = validateJsonFile(apiCatalogFile);

  if (!apiCatalog) {
    return;
  }

  if (!Array.isArray(apiCatalog.linkset)) {
    errors.push(`${toPosix(apiCatalogFile)}: linkset must be an array`);
    return;
  }

  const links = apiCatalog.linkset.flatMap((entry) => (Array.isArray(entry?.links) ? entry.links : []));
  const requiredLinks = new Map([
    ['https://www.spiritlhl.net/guide/', 'virtualization guide index'],
    ['https://www.spiritlhl.net/case/', 'practical case index'],
    ['https://www.spiritlhl.net/developer/', 'developer guide index'],
    ['https://www.spiritlhl.net/.well-known/agent-skills/index.json', 'Agent Skills index'],
    ['https://www.spiritlhl.net/.well-known/mcp/server-card.json', 'MCP server card'],
    ['https://www.spiritlhl.net/.well-known/http-message-signatures-directory', 'HTTP message signatures directory'],
  ]);

  for (const [href, label] of requiredLinks) {
    if (!links.some((link) => link?.href === href)) {
      errors.push(`${toPosix(apiCatalogFile)}: missing ${label} link ${href}`);
    }
  }

  const agentSkillsLink = links.find((link) => link?.href === 'https://www.spiritlhl.net/.well-known/agent-skills/index.json');
  if (agentSkillsLink && agentSkillsLink.rel !== 'agent-skills') {
    errors.push(`${toPosix(apiCatalogFile)}: Agent Skills link rel must be "agent-skills"`);
  }
}

function parseHeadersFile() {
  const headersFile = path.join(publicDir, '_headers');

  if (!fileExists(headersFile)) {
    errors.push('docs/public/_headers: file is missing');
    return new Map();
  }

  const routes = new Map();
  let currentRoute = null;

  for (const rawLine of readText(headersFile).split(/\r?\n/)) {
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
      currentRoute = trimmed;
      routes.set(currentRoute, []);
      continue;
    }

    if (!currentRoute) {
      errors.push('docs/public/_headers: header directive appears before a route');
      continue;
    }

    routes.get(currentRoute).push(trimmed);
  }

  return routes;
}

function validatePublicHeaders() {
  const routes = parseHeadersFile();
  const rootHeaders = routes.get('/');
  const requiredRootHeaders = [
    'link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    'link: </.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
    'link: </.well-known/mcp/server-card.json>; rel="service-doc"; type="application/json"',
    'content-type: text/html; charset=utf-8',
  ];
  const requiredRoutes = new Map([
    ['/.well-known/api-catalog', ['content-type: application/linkset+json', 'cache-control: public, max-age=86400', 'access-control-allow-origin: *']],
    ['/.well-known/agent-skills/index.json', ['content-type: application/json', 'cache-control: public, max-age=86400', 'access-control-allow-origin: *']],
    ['/.well-known/agent-skills/*/SKILL.md', ['content-type: text/markdown; charset=utf-8', 'cache-control: public, max-age=86400', 'access-control-allow-origin: *']],
    ['/.well-known/mcp/server-card.json', ['content-type: application/json', 'cache-control: public, max-age=86400', 'access-control-allow-origin: *']],
    ['/.well-known/http-message-signatures-directory', ['content-type: application/json', 'cache-control: public, max-age=86400', 'access-control-allow-origin: *']],
    ['/robots.txt', ['content-type: text/plain; charset=utf-8', 'cache-control: public, max-age=86400']],
  ]);

  if (!rootHeaders) {
    errors.push('docs/public/_headers: missing route /');
  } else {
    for (const requiredHeader of requiredRootHeaders) {
      if (!rootHeaders.includes(requiredHeader)) {
        errors.push(`docs/public/_headers: route / missing "${requiredHeader}"`);
      }
    }
  }

  for (const [route, requiredHeaders] of requiredRoutes) {
    const headers = routes.get(route);

    if (!headers) {
      errors.push(`docs/public/_headers: missing route ${route}`);
      continue;
    }

    for (const requiredHeader of requiredHeaders) {
      if (!headers.includes(requiredHeader)) {
        errors.push(`docs/public/_headers: route ${route} missing "${requiredHeader}"`);
      }
    }
  }
}

function validateRobotsRules() {
  const robotsFile = path.join(publicDir, 'robots.txt');

  if (!fileExists(robotsFile)) {
    errors.push('docs/public/robots.txt: file is missing');
    return;
  }

  const content = readText(robotsFile);
  const requiredRules = [
    'Allow: /.well-known/',
    'Allow: /guide/',
    'Allow: /case/',
    'Allow: /developer/',
    `Sitemap: ${siteOrigin}/sitemap.xml`,
  ];

  for (const rule of requiredRules) {
    if (!content.includes(rule)) {
      errors.push(`docs/public/robots.txt: missing "${rule}"`);
    }
  }
}

function validateMcpServerCard() {
  const serverCardFile = path.join(publicDir, '.well-known', 'mcp', 'server-card.json');
  const serverCard = validateJsonFile(serverCardFile);

  if (!serverCard) {
    return;
  }

  const tools = serverCard.capabilities?.tools;
  if (Array.isArray(tools) && tools.length > 0) {
    errors.push('docs/public/.well-known/mcp/server-card.json: static site must not advertise executable MCP tools');
  }

  if (serverCard.metadata?.serviceType !== 'static-documentation-discovery') {
    errors.push('docs/public/.well-known/mcp/server-card.json: metadata.serviceType must be "static-documentation-discovery"');
  }

  const resources = Array.isArray(serverCard.capabilities?.resources) ? serverCard.capabilities.resources : [];
  const requiredResourceUris = [
    'https://www.spiritlhl.net/guide/',
    'https://www.spiritlhl.net/case/',
    'https://www.spiritlhl.net/developer/',
    'https://www.spiritlhl.net/.well-known/api-catalog',
    'https://www.spiritlhl.net/.well-known/agent-skills/index.json',
  ];

  for (const uri of requiredResourceUris) {
    if (!resources.some((resource) => resource?.uri === uri)) {
      errors.push(`docs/public/.well-known/mcp/server-card.json: missing resource URI ${uri}`);
    }
  }
}

function validateAgentSkillsIndex() {
  const indexFile = path.join(publicDir, '.well-known', 'agent-skills', 'index.json');
  const index = validateJsonFile(indexFile);

  if (!index) {
    return;
  }

  if (index.$schema !== 'https://schemas.agentskills.io/discovery/0.2.0/schema.json') {
    errors.push(`${toPosix(indexFile)}: unexpected Agent Skills discovery schema "${index.$schema}"`);
  }

  if (!Array.isArray(index.skills)) {
    errors.push(`${toPosix(indexFile)}: skills must be an array`);
    return;
  }

  for (const skill of index.skills) {
    if (!skill || typeof skill !== 'object') {
      errors.push(`${toPosix(indexFile)}: each skill entry must be an object`);
      continue;
    }

    const { name, type, description, url, digest } = skill;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name ?? '')) {
      errors.push(`${toPosix(indexFile)}: invalid skill name "${name}"`);
    }

    if (type !== 'skill-md' && type !== 'archive') {
      errors.push(`${toPosix(indexFile)}: skill "${name}" has invalid type "${type}"`);
    }

    if (typeof description !== 'string' || !description.trim()) {
      errors.push(`${toPosix(indexFile)}: skill "${name}" must have a description`);
    }

    if (typeof url !== 'string' || !url.startsWith(siteOrigin)) {
      errors.push(`${toPosix(indexFile)}: skill "${name}" must use a local absolute URL`);
      continue;
    }

    if (typeof digest !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(digest)) {
      errors.push(`${toPosix(indexFile)}: skill "${name}" has invalid digest "${digest}"`);
      continue;
    }

    const artifactPath = routeCandidates(new URL(url).pathname).find(fileExists);
    if (!artifactPath) {
      errors.push(`${toPosix(indexFile)}: skill "${name}" artifact does not exist at ${url}`);
      continue;
    }

    const actualDigest = `sha256:${createHash('sha256').update(readFileSync(artifactPath)).digest('hex')}`;
    if (actualDigest !== digest) {
      errors.push(`${toPosix(indexFile)}: skill "${name}" digest mismatch, expected ${actualDigest}`);
    }

    const frontmatter = parseSimpleFrontmatter(artifactPath);
    if (frontmatter.name !== name) {
      errors.push(`${toPosix(artifactPath)}: frontmatter name must match discovery entry "${name}"`);
    }
    if (typeof frontmatter.description !== 'string' || !frontmatter.description.trim()) {
      errors.push(`${toPosix(artifactPath)}: frontmatter description is required`);
    }
    if (frontmatter.license !== 'ISC') {
      errors.push(`${toPosix(artifactPath)}: frontmatter license must be "ISC"`);
    }
  }
}

function validateLocalePairs() {
  const markdownFiles = walk(docsDir, (filePath) => filePath.endsWith('.md'))
    .map((filePath) => path.relative(docsDir, filePath).split(path.sep).join('/'))
    .filter((relative) => !relative.startsWith('.vitepress/'));

  const fileSet = new Set(markdownFiles);
  const pairedRoots = ['case/', 'developer/', 'guide/', 'incomplete/', 'index.md'];

  for (const relative of markdownFiles) {
    if (relative.startsWith('en/')) {
      const zhRelative = relative.slice(3);
      if (pairedRoots.some((prefix) => zhRelative.startsWith(prefix) || zhRelative === prefix) && !fileSet.has(zhRelative)) {
        errors.push(`docs/${relative}: missing Chinese counterpart docs/${zhRelative}`);
      }
      continue;
    }

    if (pairedRoots.some((prefix) => relative.startsWith(prefix) || relative === prefix)) {
      const enRelative = `en/${relative}`;
      if (!fileSet.has(enRelative)) {
        errors.push(`docs/${relative}: missing English counterpart docs/${enRelative}`);
      }
    }
  }
}

function yyyymmdd(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function extractPinnedDockerDates(file) {
  const content = readText(file);
  const dates = new Set();

  for (const match of content.matchAll(/spiritlhl\/oneclickvirt:(?:no-db-)?(\d{8})/g)) {
    dates.add(match[1]);
  }

  return [...dates].sort();
}

function validateDockerTags() {
  const zhFile = path.join(docsDir, 'guide', 'oneclickvirt', 'oneclickvirt_install.md');
  const enFile = path.join(docsDir, 'en', 'guide', 'oneclickvirt', 'oneclickvirt_install.md');
  const zhDates = extractPinnedDockerDates(zhFile);
  const enDates = extractPinnedDockerDates(enFile);
  const today = yyyymmdd(new Date());

  if (zhDates.join(',') !== enDates.join(',')) {
    errors.push(`Docker tag dates differ between zh (${zhDates.join(',')}) and en (${enDates.join(',')}) install docs`);
  }

  for (const date of new Set([...zhDates, ...enDates])) {
    if (date > today) {
      errors.push(`Docker tag date ${date} is later than today ${today}`);
    }
  }
}

validateMarkdownTargets();
validateConfigLinks();
validatePublicJsonAndUrls();
validateApiCatalog();
validateAgentSkillsIndex();
validatePublicHeaders();
validateRobotsRules();
validateMcpServerCard();
validateLocalePairs();
validateDockerTags();

if (errors.length) {
  console.error(`Docs check failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Docs check passed: links, assets, JSON metadata, Agent Skills digests, locale pairs, and Docker tags are consistent.');
