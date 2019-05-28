import React from 'react'
// Abstracted away the form itself to the AuthForm component
// Abstracted away the functionality of the form & toggle
// using render props (../shared/toggle etc.) 
import AuthForm from './AuthForm'
import Form from '../shared/Form'
import Toggle from '../shared/Toggle'
import { withUser } from '../context/UserProvider'

const Auth = (props) => {
    // userProvider provides the signup and login methods, deconstructed here
    const { signup, login } = props
    return (
        <div className="auth-form">
            {/* toggle needs a prop called "render" which is a function that
            expects "props" (which is then further detructured to "on" (the on/off boolean)
            and "toggler" (the toggler method)), so that it can access the toggle state 
            (for this instance of toggle) and the toggle method. */}
            <Toggle render={({on, toggler}) =>
            // wrapping the toggle in a ternary statement to enable toggle functionality
            // if on is false, show the first Form, else show the second Form
            !on?
                // we're using fragment tags to allow the containing div to reach
                // the fragmented Forms for styling purposes
                // Note: If mapping through Fragments, import Frament (like Component) 
                // from react to allow a "key" to be given to each fragment -> <Fragment key={i}>
                // There are two Forms here (which we're toggling between), one for
                // signup, and one for login.
                <>
                {/* the Form render prop expects several things */}
                    <Form
                        // inputs is an object that has a username and a password
                        inputs={{ username: "", password: "" }}
                        // submit is a function that is immediately called (much like render)
                        // that takes the inputs as an argument and does something with them
                        // the submit function is defined here. Form knows that it is expecting
                        // as submit function that will be sent as a prop, and that whatever
                        // that function is, it will use the inputs provided to the Form as the argument
                        // in this case, the function is the "signup" function provided via Context
                        // by withUser in userProvider
                        submit={inputs => login(inputs)}
                        // On render, spread the formProps into an AuthForm component
                        // formProps include "inputs", "handleChange", and "handleSubmit"
                        // Note: AuthForm also expects a btnText prop (whatever text the button 
                        // is to display)
                        render={ formProps => <AuthForm {...formProps} btnText="Login"/>}
                    />
                    <p onClick={toggler}>Not yet a member?</p>
                </>
                :
                <>
                    <Form 
                        inputs={{ username: "", password: " "}}
                        submit={inputs => signup(inputs)}
                        render={ formProps => <AuthForm {...formProps} btnText="Sign Up"/>}
                    />
                    <p onClick={toggler}>Already registered?</p>
                </>  
            }/>
        </div>
    )
}

export default withUser(Auth)
