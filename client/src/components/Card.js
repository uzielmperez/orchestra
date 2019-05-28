import React from 'react'

export default function Card(props) {

    return (
        <div className="card">
            <h2>{props.title}</h2>
            <h3><span>Description: </span>{props.description}</h3>
            <h3><span>Price: </span>{props.price}</h3>
            <h3><span>Location: </span>{props.location}</h3>
        </div>
    )
}