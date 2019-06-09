// RENDER PROPS VS. CONTEXT
// context is used ONCE, it keeps track of the
// same instance of state for all of the components that are using it
// render props (in the case of this Form.js) will create
// a separate instance of state for each component that uses it
// test2
import { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
        // we could hardcode state here with something like
        // username: "", password: ""
        // but instead, we can make it dynamic with something like
            inputs: this.props.inputs
            // which will be an object (inputs) that is provided when
            // the Form is created
            // this is also why props is being passed through the constructor
            // (i.e. it's using props that will be passed to this component
            // to dynamically create state)
            // it looks like CONSTRUCTOR passes props to SUPER, which in
            // turn passes props to this.props.inputs
        }
    }

    handleChange = (e) => {
        // dynamically change the state of the affected input
        // which will only exist when render props is called and 
        // the input props are passed to the Form component 
        // first, pull the name and value from the event target
        const { name, value } = e.target
        // state is currently defined as an object with a key of inputs
        // whose value is this.props.inputs
        // MUST use prevState, to keep track of
        // the previously defined inputs (i.e. if username
        // has already been typed in)
        // and THEN update the appropriate field
        // use square brackets to dynamically set the key
        // otherwise, this.setState would literally 
        // look for a "name" key in this.state.inputs 
        this.setState(prevState => ({ 
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // needs to be able to call any submit function 
        // so in the same way that inputs were passed as props
        // (i.e. we didn't know what the inputs would be)
        // we are now passing a prop called submit
        // which will be the function that is called by
        // handleSubmit and will also include the inputs from state
        // for example, the submit prop could be LOGIN() or SIGNUP()
        // (as defined via context in the UserProvider component)
        // which would then follow its respective axios request 
        // SUBMIT is whatever we define as submit in the submit prop
        // on any Form component
        // so we're saying run the function that we passed as the "submit"
        // prop on Form and use the inputs in state as the argument
        this.props.submit(this.state.inputs)
    }

    render() {
        // render props are being passed as an object here :)
        // provide the props specified here to whatever we are rendering (likely
        // another component)
        return this.props.render({ 
            inputs: this.state.inputs,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        })
    }
}
