# yada

use nginx detect user-agent to proxy to express and run puppeteer.

use puppeteer fetch spa(single page application) html and insert to db, redis then response.

### Installation
`npm install`

### Develop
`npm run dev`

### Build
`npm run build`

### Run
`npm start`

### env
copy .env.dev to .env

### DB Table prerender
field  | type
------------- | -------------
id  | int
createdAt  | timestamp
updatedAt  | timestamp
deletedAt  | timestamp
url  | text
html  | longtext

### DB
/db/prerender.sql

### Nginx config
/nginx/default

