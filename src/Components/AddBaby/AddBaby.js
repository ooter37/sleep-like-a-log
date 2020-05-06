import React from "react";
import "./AddBaby.scss";
import axios from "axios";
import { connect } from "react-redux";
import {pleaseSignIn,addedSuccess,errorAdding,confirmAdd} from '../Alerts'

class AddBaby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      babyName: '',
      identifier: '',
      existingBabyName: '',
      existingId: '',
      existingIdentifier: ''
    };
    this.addBaby = this.addBaby.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  addBaby() {
    if (this.props.user.data) {
      const user_id = this.props.user.data.user_id;
      const babyName = this.state.babyName;
      const identifier = this.state.identifier;
      axios
        .post("/api/babies", { babyName, user_id, identifier })
        .then(() => {
          this.props.getBabies();
          addedSuccess.fire({
            title: 'New Baby Added',
            text: `${this.state.babyName} added with an identifier of ${this.state.identifier}.`
          })
          this.setState({ babyName: "", identifier: "" })
        })
        .catch((err) => console.log("Error adding new baby.", err));
    } else {
      pleaseSignIn.fire()
    }
  }
  addExistingBaby() {
    if (this.props.user.data) {
      const user_id = this.props.user.data.user_id
      const existingName = this.state.existingBabyName
      const existingIdentifier = this.state.existingIdentifier
      const existingId = this.state.existingId
      axios.put('api/babies', {user_id, existingName, existingIdentifier, existingId})
      .then(() => {
        this.props.getBabies()
        addedSuccess.fire({
          title: 'Existing Baby Added',
          text: `Added ${this.state.existingBabyName} to ${this.props.user.data.email}'s account.`
        })
        this.setState({ existingBabyName: '', existingId: '', existingIdentifier: '' })
      }).catch((err) => {
        errorAdding.fire({text: 'Information is incorrect or baby has already been added to your account.'})
        console.log('Error adding existing baby.', err)})
    } else {
      pleaseSignIn.fire()
    }
  }
  render() {
    // if (!this.props.user.data) {
    //     return <></>
    // }
    return (
      <div>
        {this.props.user.data 
        ? 
        <div className='add-baby-container'>
          <div className='add-new-baby-container'>
            <h1 className='add-baby-label'>Add a New Baby</h1>
            <p className='add-baby-paragraph'>Enter a name and a an identifier (four to ten characters) 
              key for your baby, then click add. The identifier is used to allow other users to add 
              the baby to their account, and can be changed later. Your baby will display in a new tab 
              where you'll be able to add sleep logs.</p>
            <p className='add-baby-paragraph'>Total sleep time per day over the last five days 
            will be displayed in a chart, and you can view detailed records of all logs in the
            detailed log section.</p>
            <div className='add-baby-input-container'>
              <input
                className='add-baby-name-input'
                placeholder='Name'
                type='text'
                name='babyName'
                value={this.state.babyName}
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                maxLength='10'
                className='add-baby-identifier-input'
                placeholder='Identifier'
                type='text'
                name='identifier'
                value={this.state.identifier}
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <button
              className='button add-baby-button'
              onClick={() => { if (this.props.user.data) {
                if (this.state.babyName === "") {errorAdding.fire({text: 'Please enter a name.'})}
                  else if (this.state.identifier.length > 3) {
                    confirmAdd.fire({
                      text: `Would you like to add ${this.state.babyName} with an identifier of ${this.state.identifier}?`
                    }).then((result) => {
                      if (result.value) {
                        this.addBaby()
                      }
                    })
              } else {
                errorAdding.fire({text: 'Identifier must be at least four characters.'})
              } } else {
                pleaseSignIn.fire()
              }
              }
              
              }>Add New Baby
            </button>
          </div> 
          <div className='add-existing-container'>
          <h1 className='add-baby-label'>Add an Existing Baby</h1>
          <p className='add-baby-paragraph'>Add a baby that already exists on another user's account. You'll need
          the baby's name, the ID number, and the identifier. ID numbers are automatically generated
          when the baby is initially added, and can be found on the tab with the baby name.</p>
          <div className='add-baby-input-container'>
              <input
                className='add-existing-name-input'
                placeholder='Name'
                type='text'
                name='existingBabyName'
                value={this.state.existingBabyName}
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className='add-existing-id-input'
                placeholder='ID'
                type='text'
                name='existingId'
                value={this.state.existingId}
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className='add-existing-identifier-input'
                placeholder='Identifier'
                type='text'
                name='existingIdentifier'
                value={this.state.existingIdentifier}
                onChange={(e) => this.changeHandler(e)}
              />
          </div>
            <button
                className='button add-existing-button'
                onClick={() => { if (this.props.user.data) {
                  if (this.state.existingBabyName === '' || this.state.existingId === '' || this.state.existingIdentifier === '') 
                  {errorAdding.fire({text: 'Please enter a name, ID, and identifier for the baby you would like to add.'})} 
                  else {
                    confirmAdd.fire({
                      text: `Would you like to add ${this.state.existingBabyName}, with an ID of ${this.state.existingId} and an 
                      identifier of ${this.state.existingIdentifier} to your account?`
                    }).then((result) => {
                      if (result.value) {
                        this.addExistingBaby();
                      }
                    })} } else {
                      pleaseSignIn.fire()
                    }
                }
                }>Add Existing Baby
            </button>
          </div> 
        </div>
         
        : 
        (
          <p className='add-baby-login-paragraph'>Please login to continue.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(AddBaby);
