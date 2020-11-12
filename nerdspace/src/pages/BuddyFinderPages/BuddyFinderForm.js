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
        } else {
            this.state.errors["gender"] = "";
        }

        if (this.state.educationLevel === "Junior College") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                const newErrMsg = { ...this.state.errors, yearOfStudy: "YearOfStudy field must only have numbers"};
                this.setState({errors: newErrMsg});
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 2) {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: "Year of study for junior college must be below 3"};
                    this.setState({errors: newErrMsg});
                    formIsValid = false;
                } else {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: ""};
                    this.setState({errors: newErrMsg});
                }
            }
        }
        if (this.state.educationLevel === "Polytechnic") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                const newErrMsg = { ...this.state.errors, yearOfStudy: "YearOfStudy field must only have numbers"};
                this.setState({errors: newErrMsg});
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 3) {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: "Year of study for polytechnic must be below 4"};
                    this.setState({errors: newErrMsg});
                    formIsValid = false;
                } else {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: ""};
                    this.setState({errors: newErrMsg});
                }
            }
        }

        if (this.state.educationLevel === "Secondary") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                const newErrMsg = { ...this.state.errors, yearOfStudy: "YearOfStudy field must only have numbers"};
                this.setState({errors: newErrMsg});
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 5) {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: "Year of study for secondary must be below 5"};
                    this.setState({errors: newErrMsg});
                    formIsValid = false;
                } else {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: ""};
                    this.setState({errors: newErrMsg});
                }
            }
        }

        if (this.state.educationLevel === "University") {
            const re = /^[0-9\b]+$/;
            if (!re.test(this.state.yearOfStudy)) {
                const newErrMsg = { ...this.state.errors, yearOfStudy: "YearOfStudy field must only have numbers"};
                this.setState({errors: newErrMsg});
                formIsValid = false;
            } else {
                if (parseInt(this.state.yearOfStudy) > 5) {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: "Year of study for university must be below 5"};
                    this.setState({errors: newErrMsg});
                    formIsValid = false;
                } else {
                    const newErrMsg = { ...this.state.errors, yearOfStudy: ""};
                    this.setState({errors: newErrMsg});
                }
            }
        }

        if (this.state.interest == null) {
            this.state.errors["interest"] = "Interest field cannot be empty";
            formIsValid = false;
        }  else {
            this.state.errors["interest"] = "";
        }

        this.forceUpdate();
        return formIsValid;
    }

    render() {
        if (this.state.isAuthenticating) {
            return <div className="container" style={{margin:"auto"}}>
                <CircularProgress />
            </div>
        }
        if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <NavBar history={this.props.history} />
                <Col>
                    <div style={styles.container}>
                        <div style={styles.header}>
                            <h2>Find your ideal study buddy</h2>
                            <h6>Fill in the desired attributes in your study buddy</h6>
                        </div>
                        <div>
                            <Form style={styles.form}>
                                <fieldset>
                                    <Form.Group as={Row} onSubmit={this.findBuddy} style={{ padding: "1rem" }}>
                                        <Form.Label as="legend" column sm={2} style={{ bottom: "1rem", fontWeight: "600", right: "1rem" }}>Gender</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label="Male"
                                                name="gender"
                                                id="gender"
                                                value="Male"
                                                onChange={this.handleInputChange}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Female"
                                                name="gender"
                                                id="gender"
                                                value="Female"
                                                onChange={this.handleInputChange}
                                            />
                                            <span style={{ color: "red", right: "3rem" }}>{this.state.errors["gender"]}</span>
                                        </Col>

                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2} style={{ bottom: "1rem", fontWeight: "600"}}>Education Level</Form.Label>
                                    <Col sm={7} style={{ left: "1.5rem" }}>
                                        <Form.Control as="select" id="educationLevel" name="educationLevel" onChange={this.handleInputChange}>
                                            <option>Primary</option>
                                            <option>Secondary</option>
                                            <option>Polytechnic</option>
                                            <option>Junior College</option>
                                            <option>University</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm={3} style={{ left: "1.5rem" }}>
                                        <Form.Control required as="select" id="yearOfStudy" name="yearOfStudy" placeholder="Year of study" onChange={this.handleInputChange}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </Form.Control>
                                        <span style={{ color: "red", left: "3rem" }}>{this.state.errors["yearOfStudy"]}</span>
                                    </Col>
                                </Form.Group>
                                <fieldset>
                                    <Form.Group as={Row} onChange={this.handleInputChange}>
                                        <Form.Label as="legend" column sm={2} style={{ bottom: "1rem", fontWeight: "600" }}>Interests</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="Math"
                                                label="Math"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="General Paper"
                                                label="General Paper"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="Chemistry"
                                                label="Chemistry"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="Physics"
                                                label="Physics"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="Computing"
                                                label="Computing"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="interest"
                                                name="interest"
                                                value="Economics"
                                                label="Economics"
                                                disabled={this.state.interestField}
                                            />
                                            <Form.Control style={{marginTop:"10px"}} type="input" id="interest" name="this.state.name" placeholder="Others" onChange={this.handleInterestText} />
                                            <span style={{ color: "red" }}>{this.state.errors["interest"]}</span>
                                        </Col>
                                    </Form.Group>
                                </fieldset>

                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button style={{marginTop:"20px"}} onClick={this.submitForm} type="submit">Submit</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Col>
            </div>
        )
    }

}

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
        paddingBottom: "2rem",
    },
    form: {
        justifyContent: "space-between",
        padding: "1.4rem",
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {})(BuddyFinderForm);
