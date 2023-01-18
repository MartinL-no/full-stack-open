# Bloglist PostgresQL Express backend <br />

## Overview

I created this app as an assignmnt for the [Full Stack Open](https://fullstackopen.com/en/) course.

It is an Express backend for a bloglist application using a PostgresQL database/ [Sequelize](https://sequelize.org/) ORM

From creating it I learnt about:

- **SQL database querying and table structure**
- **Creating PostgresQL table structures via Sequelize object relational mapping**
- **[Initilizing](https://github.com/MartinL-no/full-stack-open/blob/main/part13/util/db.js) databases and updating tables using [migrations](https://github.com/MartinL-no/full-stack-open/tree/main/part13/migrations)**
- **Querying and updating database tables using Sequelize library**
- **Creating one to many and many to many realtionships between tables**
- **Eager vs lazy fetching from databases**
- **Defining default scopes of database tables**

## Features

- Node.js [Express](https://expressjs.com/) application

- [Sequelize](https://sequelize.org/) ORM

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) authentication

- [bcrypt](https://www.npmjs.com/package/bcrypt) password hashing

- [dotenv]([https://www.npmjs.com/package/cross-env](https://www.npmjs.com/package/dotenv) environment middleware enabler

- [express-async-errors](https://www.npmjs.com/package/express-async-errors) middleware error handler

- [umzug](https://www.npmjs.com/package/umzug) migration tool

- [pg](https://www.npmjs.com/package/pg) PostgreSQL client

Note: needs the following enivroment variables to run/test locally DATABASE_URL, SECRET


## Install

```sh
npm install
```


## Usage

```sh
npm start
```
