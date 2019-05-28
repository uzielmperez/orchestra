import React, { Component } from 'react'
import axios from 'axios'

// createContext returns an object that contains
// Provider and Consumer, I'm destructuring that object here
const { Provider, Consumer } = React.createContext()
// create our own version of axios, to include token in header
const tokenAxios = axios.create()

// axios contains a package called interceptors, which
// provides the ability to fire off functions at specified moments
// and allows us to configure our version of axios
    // we can further specify that this will be used for any outgoing requests with
    // .request -> use the following configuration -> .request.use( (config) => {})
// this is considered middleware (on the frontend)
tokenAxios.interceptors.request.use((config) => {
    // outside of class, can't access state here, so token is being pulled from local storage
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    // return config object to make configuration change to axios
    return config
})

class UserProvider extends Component {
    constructor() {
        super()
        this.state = {
            // use the || to persist username and token if user is logged in 
            // by querying local storage first
            // state will reset to defaults on refresh (set to {} and "")
            // so this will keep user from being "logged out" if they refresh
            // the token "check" in App.js is checking to see whether
            // there is a token (string, but not an empty string) in UserProvider's state
            // token is a string, so no parsing is needed, but user needs to be parsed into
            // a javascript object (local storage uses JSON)
            user: JSON.parse(localStorage.getItem("user")) || {},
            // empty string is falsey, can ask if(token)
            token: localStorage.getItem("token") || "",
            blurbs: []
        }
    }

    // signup is going to be called on a component that has a form
    // that form will take a username and a password
    // when the user submits, signup will take the 
    // submitted credentials object which can then be 
    // sent to the backend (server -> authRouter -> signup route, which expects an  
    // object that has a username and a password)
    signup = (credentials) => {
        axios
            .post("/auth/signup", credentials)
            .then(response => {
                // destructure user and token from response object
                const { user, token } = response.data
                // if the user refreshes the page, the user and token information would
                // be lost. to prevent this, we're using local storage to store 
                // the token information.
                // localStorage accepts JSON (so we'll have to stringigy the user object
                // (i.e. add quotes to every key and every value inside of the object))
                localStorage.setItem("user", JSON.stringify(user))
                // token is already a string, so no stringify is needed
                localStorage.setItem("token", token)
                // since we're setting state to user: user (same variable name),
                // we can just use the following syntax (object literals)
                this.setState({ user, token })
            })
             // view only the error message instead of the entire error object
            .catch(err => console.log(err.response.data.errMsg))
    }

    // login also expects credentials (object with a name and a password)
    login = (credentials) => {
        axios
            .post("/auth/login", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({ user, token })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // post new blurb
    addBlurb = (blurb) => {
        tokenAxios
            // a post request will require a token (as per server setup) in the header
            // and we can define that header manually here as the third argument in post
            // .post("/api/post", blurb, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
            // OR, we can create our own customized version of axios that includes auth tokens
            .post("/api/post", blurb)
            .then(response => {
                console.log(response.data)
                // this.setState( prevState => { 
                //     blurbs: [...prevState, blurb]
                // })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // clear local storage, clear state
    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({ user: {}, token: "" })
    } 

    // Provider's value can be provided here "...this.state, onClick: this.handleClick"
    render() {
        return (
            <Provider value={{
                ...this.state,
                signup: this.signup,
                login: this.login,
                addBlurb: this.addBlurb,
                logout: this.logout
            }}>
            {/* Give Context access to all of UserProvider's children 
            (anything UserProvider is wrapped around - see index.js) */}
            { this.props.children }
            </Provider>
        )
    }
}

export default UserProvider


export const withUser = C => props => (
    <Consumer>
        {/* the Consumer's value will include the value
        passed by Provider AND whatever props were given
        to the component */}
        {(value) => <C {...value} {...props}/>}
    </Consumer>
)