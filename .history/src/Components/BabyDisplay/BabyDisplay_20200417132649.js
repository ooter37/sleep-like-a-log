import React from 'react'
import axios from 'axios'

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: []
        }
    }

    componentDidMount(){
        axios.get('/api/babies').then(res => {
            this.setState({
                babies: res.data
            })
        }).catch(err => console.log('Error getting babies', err))
    }


    render(){
        console.log(this.state.babies)
        return(
            <div>

            </div>
        )
    }
}