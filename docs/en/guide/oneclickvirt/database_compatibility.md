---
outline: deep
---

# Automatic MySQL / MariaDB Compatibility

Startup, recovery reconnects, the initialization connection test and initialization submission share one connection implementation. The actual server reported by `SELECT VERSION()` determines compatibility, not the controller CPU, browser architecture or `system.db-type` label. An incorrect label does not require changing the data directory.

## Configuration and Precedence

Use `mysql:` for either engine. The historical `mariadb:` section remains supported. If both exist, the complete `mysql:` section wins; credentials and endpoints are never assembled from different sections. Nonempty `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` and `DB_TYPE` override the file. Empty optional deployment variables do not erase persisted settings. For an intentionally empty password, configure it in YAML and remove any nonempty environment override. Password whitespace, quotes and backslashes are preserved literally.

The initialization page preserves advanced pool, timeout and TLS settings. If deployment environment variables still point to another endpoint, update them too and restart; they continue to take precedence over file changes. Custom startup configuration paths and `.yml` files use the selected file.

## Automatic Repairs

- Detect MySQL/MariaDB from the connected server and select SQL per connection. Probing another database cannot change the dialect of an active pool.
- Detect compatible aliases for `transaction_isolation` / `tx_isolation` and `transaction_read_only` / `tx_read_only`. Conflicting values fail explicitly.
- Verify known default UTF8MB4 collations. MariaDB UCA1400 names supported by the server but unavailable in the driver's handshake table are applied on every session. Known defaults unsupported by the actual server fall back to `utf8mb4_unicode_ci`, with a repair notice. Existing table and index collations are not changed.
- Bound initial connection time while retaining user pool and read/write timeout settings.
- Generate a compatible runtime configuration for known version-specific embedded-server tuning options while retaining the original `my.cnf`. Installers reuse an existing engine instead of replacing it because of an incorrect label.
- The shared Compose `deploy/my.cnf` keeps both `loose-innodb_redo_log_capacity` and `loose-innodb_log_file_size`: MySQL applies the first and MariaDB applies the second. The embedded single-container entrypoint additionally emits a strict engine-specific runtime file.
- The embedded single-container entrypoint does not trust a mounted config's data directory, socket, port or engine label. It detects the daemon version and appends the lifecycle paths to a runtime copy; when both engines are installed and the data directory is ambiguous, it refuses to guess. Bare-metal installation likewise stops when data markers belong to the other engine, without overwriting or deleting the data.
- Bare-metal installation accepts `noninteractive=true` and the historical `NONINTERACTIVE=true`; an explicit lowercase value takes precedence. Passwords, IPv6 addresses and names containing YAML syntax are preserved literally. Account provisioning adds `NO_BACKSLASH_ESCAPES` only to its temporary administrative session, without changing the global SQL mode or application transaction settings.
- Bare-metal installation obtains the versioned `deploy/my.cnf`, renders it as `oneclickvirt.cnf` in the native database include directory, and syntax-checks it with the detected `mysqld`/`mariadbd` before restart. Existing administrator files and the source remain untouched; a previous OneClickVirt drop-in is kept as a timestamped backup. Set `DB_CONFIG_SOURCE` only to a reviewed replacement source. The Compose `0.0.0.0` bind is narrowed to `127.0.0.1` for bare-metal use.

Connection tests return the actual type, version and repairs, never the password. Startup and recovery apply repairs in memory; when the configuration is writable, they atomically back up and save the detected engine and repaired options only if the endpoint is still current, so a stale probe cannot overwrite a newer configuration. Initialization submission backs up the original file and saves detection results. A read-only file can still connect normally; the repair is reported instead of making startup fail.

## Safety Boundaries

Automatic compatibility does not discard arbitrary errors. Incorrect passwords, permission errors, invalid TLS certificates, unknown options, conflicting transaction settings and unsupported security settings fail explicitly. The panel does not change passwords, disable certificate verification, relax SQL modes or delete data to make a connection succeed. A nonempty directory missing system tables, or data belonging to the other engine, requires backup and an explicit migration, not direct reuse of engine-specific data files.

The Compose database listens on its container network so the API can connect. Its default host binding is `127.0.0.1:3306:3306`, not a public listener. Embedded single-container and external-database deployments have different network boundaries; do not copy their listener settings interchangeably.

## Repeatable Validation

Run `bash scripts/tests/database_compat_integration_test.sh` in the source repository. It creates isolated, disposable real database containers and tests wrong labels in both directions, historical sections, connection options, invalid settings, initialization and restart with retained data. Cleanup targets only its own containers and volumes. CI covers MySQL 8.0 / 8.4 / 9 and MariaDB 10.11 / 11.4. Missing Docker, startup errors and assertion failures fail the job rather than producing skipped success.
