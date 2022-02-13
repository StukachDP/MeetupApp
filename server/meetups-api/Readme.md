# Api servers for meetups

Node version is `16.12.0`.

### What is `.msj` file

> Node.js treats JavaScript code as CommonJS modules by default. Authors can tell Node.js to treat JavaScript code as ECMAScript modules via the .mjs file extension, the package.json "type" field, or the --input-type flag.

https://nodejs.org/api/esm.html#modules-ecmascript-modules

### How to run

Run `node index.mjs` in the terminal.

### How to stop

Press `ctrl+c` in the terminal.

### How to reset database

- Stop server
- Remove file `db.json`
- Start server

### Project structure

- `index.js` - entry point where app inits.
- `db.json` - Data base file. It will be generated on the first server run. Do not commit it
- `auth.mjs` - Auth strategy configuration
- `ensureAthenticated.mjs` - router middleware for restricting endpoint access by only authenticated users
- `generateInitialData.mjs` - script that seed empty database on the first app run
- `data/*.mjs` - data generators
- `routes/*.mjs` - endpoints for specific futures
