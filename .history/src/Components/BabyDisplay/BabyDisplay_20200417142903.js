import React from 'react'
import axios from 'axios'
import DatePicker from 'react-date-picker'

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
        const mappedBabies = this.state.babies.map(baby => {
            return (
                <div key={baby.baby_id}>
                    NAME: {baby.name}
                    {
                        () => {
                            const [startDate, setStartDate] = useState(new Date());
                            return (
                              <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                              />
                            );
                          }
                    }
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