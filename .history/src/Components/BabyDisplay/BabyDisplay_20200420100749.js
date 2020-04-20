import React from 'react'
import axios from 'axios'
import NewLogEntry from '../NewLogEntry/NewLogEntry'

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],

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
        const mappedBabies = this.state.babies.map(baby => {
            return (
                <div key={baby.baby_id}>
                    NAME: {baby.name}
                    <NewLogEntry babyId={baby.baby_id}/>
                </div>
            )
        })
        return(
            <div className='baby-container'>
                <div className='baby-card'>
                    {mappedBabies}
                </div>
            </div>
        )
    }
}