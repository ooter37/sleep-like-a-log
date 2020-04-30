import React from "react";
import "./AddBaby.scss";
import axios from "axios";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button'

class AddBaby extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        babyName: "",
        relationship: "",
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
        const babyName = this.state.babyName;
        const user_id = this.props.user.data.user_id;
        const relationship = this.state.relationship;
        axios
        .post("api/babies", { babyName, user_id, relationship })
        .then(() => {this.props.getBabies()})
        .catch((err) => console.log("Error adding baby", err));
    } else {
        window.alert("Please log in.");
    }
}
render() {
    // if (!this.props.user.data) {
    //     return <></>
    // }
    return (
    <div className="add-baby-container">
        <div className="add-baby-label">Add Baby</div>
        <div className="add-baby-input-container">
            <input
            className="add-baby-name-input"
            placeholder="Name"
            type="text"
            name="babyName"
            value={this.state.babyName}
            onChange={(e) => this.changeHandler(e)}
            />
            <input
            className="add-baby-relationship-input"
            placeholder="Relationship"
            type="text"
            name="relationship"
            value={this.state.relationship}
            onChange={(e) => this.changeHandler(e)}
            />
        </div>
        <Button
        color='primary' variant='contained' 
        className="add-baby-button"
        onClick={() => {
            if (this.state.babyName !== "" && this.state.relationship) {
                if (
                window.confirm(
                    `Would you like to add ${this.state.babyName}, with a relationship of ${this.state.relationship}?`
                )
                ) {
                this.addBaby()
                this.setState({babyName: '', relationship: ''});
            }
            }
        }}
        >
            Add Baby
        </Button>
        </div>
    );}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(AddBaby);
