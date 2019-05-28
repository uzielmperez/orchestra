import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
// BrowserRouter needs to wrap our entire app, including
// UserProvider
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider'

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <App/>
        </UserProvider>
    </BrowserRouter>, 
document.getElementById('root'))

// List of installed dependencies will be kept here (npm i)
// axios, react-router-dom, prop-types

// General note directory will be kept here
// SEE client -> package.json (connect frontend and backend) -> "proxy": "http://localhost:7000"
// GIT -> git status will give status for current directory ONLY, not entire REPO



