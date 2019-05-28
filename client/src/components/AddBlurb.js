import React from 'react'
import { withUser } from '../context/UserProvider'
import Form from '../shared/Form'
import BlurbForm from './BlurbForm'

const AddBlurb = (props) => {
    const { addBlurb, logout, username } = props
    return (
        <div>
            Hallo, {username.toUpperCase()}!
            <button onClick={logout}>Logout</button>
            <Form
                inputs={{ title: "", description: "", price: "", location: ""}}
                submit={inputs => addBlurb(inputs)}
                render={ formProps => <BlurbForm {...formProps} btnText="Add Blurb" />}
            />
        </div>
    )
}

export default withUser(AddBlurb)