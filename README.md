
# Blogify

Blogify is blog sharing platform built with a serverless backend powered by HonoJs and deployed on cloudflare workers.


## Run Locally

- Clone the project locally

```bash
  git clone https://github.com/adityapandey51/Blogify.git
```
- Setup the project

```bash
  cd blogify/backend
  yarn install
  cd ../frontend
  npm install
```
- Add wrangler.toml file
- Add pooling db URL as DATABASE_URL in wrangler.toml file
```bash
  [vars]
  DATABASE_URL = (your_pooled_connection_url)
```
- Add .env file
- Add actual db URL as DATABASE_URL in .env file for DB migrations
```bash
  DATABASE_URL = (your_pooled_connection_url)
```
- start the project
```bash
  cd backend
  yarn run dev
  cd frontend
  npm run dev
```


## Deployment

To deploy the project on cloudflare run

```bash
  npx wrangler login
  npm wrangler deploy
```


## Tech Stack

**Client:** React, TailwindCSS

**Server:** HonoJs, Prisma, PostgreSQL

**Deployment**: CloudFlare Workers for Backend, Vercel for Frontend
## Highlights

- Code Sharing was done between Frontend and Backend from the common module.
- Published the common module to NPM Registry.
- Pulled the common @adityapandey51/common package from NPM Registry.
- Used Prisma Accelerate for connection pooling.


## 🔗 Links
[![Website Link](https://img.shields.io/badge/website-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://blogify-ebon.vercel.app//)



