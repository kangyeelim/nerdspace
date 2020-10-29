import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import axios from 'axios';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../../components/NavigationComponents/NavBar";

class BuddyFinderForm extends React.Component {

    constructor() {
        super();
        this.state = {
            gender: null,
            educationLevel: "Primary",
            yearOfStudy: 1,
            interest: null,
            errors: {},
            interestField: null,
            isAuthenticating: true,
            isLoggedIn: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInterestText = this.handleInterestText.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    async componentDidMount() {
        var isLoggedIn = await isTokenAccepted(this.props.token);
        this.setState({ isLoggedIn: await isLoggedIn, isAuthenticating: false });
    }

    submitForm(event) {
        event.preventDefault();

        if (this.handleValidation()) {
            axios.post('http://localhost:5000/buddyfinderposts', {
                educationLevel: this.state.educationLevel,
                yearOfStudy: this.state.yearOfStudy,
                interest: this.state.interest,
                gender: this.state.gender,
                googleID: this.props.profile[0].googleId
            })
                .catch(err => {
                    console.error(err);
                });

            this.props.history.push({
                pathname: '/buddy-finder-result',
                state: {
                    educationLevel: this.state.educationLevel,
                    yearOfStudy: this.state.yearOfStudy,
                    interest: this.state.interest,
                    gender: this.state.gender,
                    googleID: this.props.profile[0].googleId
                }
            });
        } else {
            this.handleValidation();
        }

    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value.trim();
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(`Input name ${name}. Input value ${value}.`);
    }

    handleInterestText(event) {
        this.setState({ interestField: event.target.value.trim() });
        this.setState({ interest: event.target.value.trim() });
        console.log(`Input text interest. Input value ${event.target.value.trim()}.`);
    }

    handleValidation() {
        let formIsValid = true;

        if (this.state.gender == null) {
            this.state.errors["gender"] = "Gender field cannot be empty";
            formIsValid = false;
        }

        if (this.state.educationLevel == "Junior College") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                this.state.errors["yearOfStudy"] = "YearOfStudy field must only have numbers";
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 2) {
                    this.state.errors["yearOfStudy"] = "Year of study for junior college must be below 3";
                    formIsValid = false;
                }
            }
        }
        if (this.state.educationLevel == "Polytechnic") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                this.state.errors["yearOfStudy"] = "YearOfStudy field must only have numbers";
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 3) {
                    this.state.errors["yearOfStudy"] = "Year of study for polytechnic must be below 4";
                    formIsValid = false;
                }
            }
        }

        if (this.state.educationLevel == "Secondary") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                this.state.errors["yearOfStudy"] = "YearOfStudy field must only have numbers";
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 5) {
                    this.state.errors["yearOfStudy"] = "Year of study for secondary must be below 5";
                    formIsValid = false;
                }
            }
        }

        if (this.state.educationLevel == "University") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                this.state.errors["yearOfStudy"] = "YearOfStudy field must only have numbers";
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 5) {
                    this.state.errors["yearOfStudy"] = "Year of study for university must be below 5";
                    formIsValid = false;
                }
            }
        }



        if (this.state.interest == null) {
            this.state.errors["interest"] = "Interest field cannot be empty";
            formIsValid = false;
        }

        this.forceUpdate();
        return formIsValid;
    }



   e

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2rem",
        // padding: "3rem",
        textAlign: "center",
        justifyContent: "center",
    },
    header: {
        padding: "2rem",
    },
    form: {
        justifyContent: "space-between",
        padding: "1.4rem",
        justifyContent: "left",
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {})(BuddyFinderForm);