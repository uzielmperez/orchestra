import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

class Blurbs extends Component {
// if left undeclared, constructor is built implicitly
    constructor() {
        super()
        this.state = {
            blurbs: []
        }
    }


    componentDidMount() {
        axios
            .get('/blurbs')
            .then(response => this.setState({ blurbs: response.data }))
            .catch(err => console.log(err.response.data.errMsg))
    }

    render () {
        const mappedBlurbs = this.state.blurbs.map((blurb, i) => {
            return <Card {...blurb} key={i} />
        })

        return (
            <div className="card-container">
                {mappedBlurbs}
                <Link to="/addblurb">
                    <button>NEW BLURB</button>
                </Link>
            </div>
        )
    }
}

export default Blurbs