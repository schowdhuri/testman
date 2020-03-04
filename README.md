<h1>
  <img src="https://raw.githubusercontent.com/schowdhuri/testman/master/common/images/TestMan.png" alt="Logo" />
  TestMan

  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/node-%3E=8.x-brightgreen.svg" alt="npm >= 8.x" />
</h1>

Minimal test-case management tool

## Development

1. Create the `.env.dev` file and add `MYSQL_ROOT_PASSWORD=<some password>`

2. Get the development environment up and running:

```bash
$ docker-compose -f docker-compose.dev.yml up --build
$ docker-compose -f docker-compose.dev.yml exec db mysql -u root -p --execute="CREATE DATABASE testman;"
$ docker-compose -f docker-compose.dev.yml exec webapp node_modules/.bin/ts-node -P tsconfig.server.json scripts/setup.ts
$ docker-compose -f docker-compose.dev.yml restart
```

Open `http://localhost:3000`

## Deploy

1. Create the `.env.prod` file and add `MYSQL_ROOT_PASSWORD=<some password>`

2. Create the production docker image:

```bash
$ docker-compose -f docker-compose.prod.yml up --build
$ docker-compose -f docker-compose.prod.yml exec db mysql -u root -p --execute="CREATE DATABASE testman;"
$ docker-compose -f docker-compose.prod.yml exec webapp node_modules/.bin/ts-node -P tsconfig.server.json scripts/setup.ts
$ docker-compose -f docker-compose.prod.yml restart
```

The app is served on `http://localhost/`

## License
MIT
