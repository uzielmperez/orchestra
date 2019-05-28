import React from 'react'


export default function BlurbForm(props) {
    const { handleChange, handleSubmit, inputs: { title, description, price, location }, btnText} = props
    console.log(props)
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="title" value={title} placeholder="Title"/>
            <input onChange={handleChange} type="text" name="description" value={description} placeholder="Description"/>
            <input onChange={handleChange} type="text" name="price" value={price} placeholder="Price"/>
            <input onChange={handleChange} type="text" name="location" value={location} placeholder="Location"/>
            <button>{btnText}</button>
        </form>
    )
}