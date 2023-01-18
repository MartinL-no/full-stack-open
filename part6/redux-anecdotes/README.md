# Redux Anecdotes App <br />

## Overview

I created this app as an assignment for the [Full Stack Open](https://fullstackopen.com/en/) course.

It is a React frontend with Redux state management, a simple backend is provided using [json-server](https://www.npmjs.com/package/json-server).

From creating the project I learnt about:

- **Implementing Redux state management in a React application**
- **The more modern version of Redux (hook API) and working with stores, reducers and action creators**
- **Creating forms with Redux state management**
- **Implementing server communication that works with Redux**
- **Associated tooling such as [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Thunk](https://github.com/reduxjs/redux-thunk), [https://react-redux.js.org/](https://react-redux.js.org/) & [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)**
- **Working with older Redux code that uses the connect function**
- **Creating code that doesn't cause side-effects**
- **Code structure, separation of concerns and the concept of presentational vs container components in Redux apps**



#### [LIVE LINK](https://redux-anecdotes.netlify.app/) <br /><br />

## Features

- The app consist of one page

- The user can add, filter and like anecdotes

- State is managed using Redux, mainly using the hook API ([example](https://github.com/MartinL-no/full-stack-open/blob/main/part6/redux-anecdotes/src/reducers/anecdoteReducer.js)) with one [component](https://github.com/MartinL-no/full-stack-open/blob/main/part6/redux-anecdotes/src/components/AnecdoteForm.js) using the connect function for demonstration purposes

- When the user adds or votes for an anecdote, a notification is shown at the top of the screen for a short amount of time

- Communication with the server is imlpemented using the axios HTTP client and async action creators


## Tech Used / Dependencies

- React App bootstrapped with CRA

- [Redux](https://redux.js.org/) state management

- [Redux Toolkit](https://redux-toolkit.js.org/) toolset for efficient Redux development

- [Axios](https://github.com/axios/axios) HTTP client

- [Redux Thunk](https://github.com/reduxjs/redux-thunk) middleware

- [Eslint](https://eslint.org/) for linting

- [Json-server](https://www.npmjs.com/package/json-server) backend server for prototyping

- [npm-run-all](https://www.npmjs.com/package/npm-run-all) CLI tool for running multiple scripts


## Install

```sh
npm install
```


## Usage

```sh
npm start
```


## Run backend server

```sh
npm run start:server
```
