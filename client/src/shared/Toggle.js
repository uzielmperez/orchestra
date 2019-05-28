// This component will only render props
// (NOT JSX), so there's no need to import React
// we'd only need React if we're using its parsing
// system to create JSX elements
import { Component } from 'react'

export default class Toggle extends Component {
    constructor() {
        super()
        this.state = {
            on: false
        }
    }
    // the value of this.state.on is a boolean. When triggered,
    // the toggler will set state to the opposite of on's current value
    toggler = () => this.setState(prevState => ({ on: !prevState.on }))

    // render PROPS - returns a function CALL 
    // the call is to this.props.render() which in turn is a function
    // that provides all of the functionality of this component
    // (state and the toggle method)
    render() {
        return this.props.render({ on: this.state.on, toggler: this.toggler })
    }
}

