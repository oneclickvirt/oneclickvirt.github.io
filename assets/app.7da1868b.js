import{u as i,I as o,a2 as p,c as u,A as c,H as l,a3 as f,a4 as d,a5 as m,a6 as A,a7 as h,a8 as g,a9 as P,aa as v,ab as y,ac as C,ad as _,ae as b,af as w,S as D}from"./chunks/framework.70afa331.js";import{t as E}from"./chunks/theme.b9d97670.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=r(E),R=i({name:"VitePressApp",setup(){const{site:e}=u();return c(()=>{l(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),f(),d(),m(),s.setup&&s.setup(),()=>A(s.Layout)}});async function O(){const e=j(),a=T();a.provide(h,e);const t=g(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",y),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:C}),{app:a,router:e,data:t}}function T(){return _(R)}function j(){let e=o,a;return b(t=>{let n=w(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),o&&(e=!1),D(()=>import(n),[])):null},s.NotFound)}o&&O().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{O as createApp};
