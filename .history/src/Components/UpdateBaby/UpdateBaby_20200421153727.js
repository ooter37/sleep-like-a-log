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
        this.updateBaby = this.updateBaby.bind(this)
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
    updateBaby() {
        if (this.props.user.data !== null) {
            const babyName = this.state.babyName
        } else {
            window.alert('Please login')
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.updating
                    ?
                    <div>
                    <button
                        className='update-baby-button'
                        onClick={() => {
                            this.toggleButton()
                        }
                    }
                    >Submit</button>
                    <input
                        className='update-baby-input'
                        placeholder='Name'
                        type='text'
                        name='updateName'
                        value={this.state.babyName}
                        onChange={(e) => this.changeHandler(e)}
                    />
                    </div>
                    :
                    <button
                        className='submit-baby-button'
                        onClick={() => this.toggleButton()}
                    >Edit Name</button>
                }
            </div>
        )
    }
}