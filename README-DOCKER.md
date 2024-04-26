# cpd-3-backend

### Platforms

- Node js
- TypeORM
- TypeScript
- MySQL

## Getting Started

### dependencies

- Docker Desktop

### installing

- _https://www.docker.com/_

<!-- *****Environment Setup***** -->

### Executing programs Steps

1. Application working branch `develop`
   ```sh
   git checkout develop
   git pull ( Make sure the local branch have the latest code)
   ```
2. Set up the application environment in docker container

   ```sh
   docker compose up -d
   ```

3. <!-- Please Follow the instruction for Run the application -->

- Change the DB credentials `src/ormconfig.ts`
- Create the folder logs folder in side the src "src/logs"
- Configure your SMTP email in `config/default.ts` File with your mail id and password
  (make sure your gmail's `less secure app access` enabled)
  - check via this link
    _https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MxpkiqOzzu4VXJVlRTSmDDzL_n4jCkFHwNgumXvruDbtiUXrM8RLKzDQluYgljAmdDdxTIkKewnEUIeq-UPug4BKiwEA_

<!-- Migration Generate -->

npm run migration:generate -n <"migration file name">
npm run migration:run

## Authors

- 