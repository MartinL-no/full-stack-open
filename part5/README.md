# Bloglist Application <br />

## Overview

I created this app as an assignment for the [Full Stack Open](https://fullstackopen.com/en/) course.

It is a full stack JavaScript application with a React frontend and Node.js Express backend.

From working on this project I learnt about:

- **Creating a full stack JavaScript application**
- **Creating an Express server and API endpoints for communicating with the frontend**
- **Configuring a database (MongoDB) and creating Mongoose schemas and models in the backend application to communicate with it**
- **Implementing user authentication in the backend and frontend using JSON Web Token**
- **Creating [middleware](https://github.com/MartinL-no/full-stack-open/blob/main/part5/bloglist-backend/utils/middleware.js) to inject additional data into the request object and for error logging**
- **Creating automated unit (Jest, Testing-Library) & end to end (Cypress) tests**
- **Separating and structuring code according to industry practices**
- **Configuring and using eslint**

#### [LIVE LINK](https://full-stack-open-part11-20.fly.dev/): (username: testUser, password: testPassword)<br /><br />

## Features

- The app consist of two seperate applications, a React frontend and Node.js express backend

- The backend uses MongoDB via Mongoose to retrieve and store data in the database

- App requires the user to login which is implemented using JSON web token in the front/backend

- The user can login, create a blog, like a blog as well as delete their own blogs
<br /><br />

## Initializing frontend

See [here](https://github.com/MartinL-no/full-stack-open/tree/main/part5/bloglist-frontend)
<br /><br />

## Initializing backend

See [here](https://github.com/MartinL-no/full-stack-open/tree/main/part5/bloglist-backend)
