#!/usr/bin/env node
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const dbFileDest = path.resolve(process.cwd(), 'smack-db.json');

if (!fs.existsSync(dbFileDest)) {
  console.log(`Creating database file ${dbFileDest}`);
  fs.copyFileSync(path.resolve(__dirname, 'db.json'), dbFileDest);
} else {
  console.log(`Using database file ${dbFileDest}`);
}

console.log(`To reset the database, delete the database file.\n`);

const server = jsonServer.create();
const router = jsonServer.router(dbFileDest);
const middlewares = jsonServer.defaults({
  static: __dirname + '/public',
});

server.use(middlewares);

server.use(router);
const port =
  process.env.PORT ||
  'qupaya'.split('').reduce((sum, token) => (sum += token.charCodeAt(0)), 1000); // 1657
server.listen(port, function () {
  console.log(`JSON Server is running on port ${port}. Go to http://localhost:${port}/apidocs for the API documentation.`);
});
