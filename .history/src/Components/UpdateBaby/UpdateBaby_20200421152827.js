import React from 'react'
import './UpdateBaby.scss'

export default class UpdateBaby extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            babyName: '',
            updating: false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.toggleButton = this.toggleButton.bind(this)
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleButton(){
        let {updating} = this.state
        this.setState({
            updating: !updating
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.updating
                    ?
                    <button
                    className='update-baby-button'
                    ></button>
                    :
                    <button
                    className='submit-baby-button'
                    ></button>
                }
                <input
                    className='update-baby-input'
                    placeholder='Name'
                    type='text'
                    name='updateName'
                    value={this.state.babyName}
                    onChange={(e) => this.changeHandler(e)}
                />
            </div>
        )
    }
}