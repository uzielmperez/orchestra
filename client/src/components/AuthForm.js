import React from 'react'

const AuthForm = props => {
    // destructure props
    const { handleChange, handleSubmit, inputs: { username, password } , btnText } = props
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="username" value={username} placeholder="Username"/>
            <input onChange={handleChange} type="text" name="password" value={password} placeholder="Password"/>
            <button>{btnText}</button>
        </form>   
    )
}

export default AuthForm