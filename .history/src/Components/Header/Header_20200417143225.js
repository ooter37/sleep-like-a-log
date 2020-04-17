import React, {useState} from 'react'
import DatePicker from 'react-date-picker'
import './Header.scss'

export default class Header extends React.Component{
    render(){
        return ( 
        <div className='header'>
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
    }
}