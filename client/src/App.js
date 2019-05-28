import React from 'react'
// react-router-dom also provides a Redirect component which
// is a function that needs a path of where it should redirect to
import { Switch, Route, Redirect } from 'react-router-dom'
import Blurbs from './components/Blurbs'
import Auth from './components/Auth'
import AddBlurb from './components/AddBlurb'
// app needs to know whether the user is logged in 
// and the user's login state / token info is managed by the
// UserProvider component
import { withUser } from './context/UserProvider'
import Navbar from './components/Navbar';
import "./App.css"


const App = (props) => {
    // deconstruct user and token from UserProvider
    // further destructuring the user object to extract the username property
    const { user: { username }, token } = props
    return (
        <div>
            <Navbar/>
            <div className="body">
                <Switch>
                    <Route exact path="/" render={routerProps => <Blurbs {...routerProps} />}/>
                    {/* By default, render a component called Auth, and pass routerProps to it (
                    ROUTER PROPS includes match, history, and location - history includes
                    things like history.push (to push things into your route), history.goBack, etc. 
                    - location has things like location.pathName to tell you what path you're
                    currently on..) */}
                    {/* the render prop has an implicit return here, and we can add a ternary
                    statement, to determine if the user is already logged in and manage access */}
                    <Route path="/auth" render={routerProps => !token? <Auth {...routerProps} /> : <Redirect to="/addblurb"/>} />
                    {/* path to post new blurbs -> authentication required -> if no token,
                    redirect to the login page */}
                    <Route path="/addblurb" render={routerProps => !token? <Redirect to="/auth"/> : <AddBlurb {...routerProps} username={username}/> } />
                </Switch>
            </div>
        </div>
    )
}

export default withUser(App)