import React from 'react'
import axios from 'axios'
import AddLog from '../AddLog/AddLog'
import './BabyDisplay.scss'

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],

        }
        this.deleteBaby = this.deleteBaby.bind(this)
        this.getBabies = this.getBabies.bind(this)
    }

    componentDidMount(){
        this.getBabies()
    }
    getBabies(){
        axios.get('/api/babies').then(res => {
            this.setState({
                babies: res.data
            })
        }).catch(err => console.log('Error getting babies', err))
    }
    deleteBaby(id){
        axios.delete(`/api/babies/${id}`).then(()=> this.getBabies()).catch(err => console.log('Error deleting baby', err))
    }

    render(){
        const mappedBabies = this.state.babies.map(baby => {
            return (
                <div key={baby.baby_id}>
                    NAME: {baby.name}
                    <AddLog babyId={baby.baby_id}/>
                    <button onClick={() => this.deleteBaby(baby.baby_id)}>Delete Baby</button>
                </div>
            )
        })
        return(
                <div className='baby-container'>
                    {mappedBabies}
                </div>
        )
    }
}