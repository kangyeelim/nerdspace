import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import axios from 'axios';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../../components/NavigationComponents/NavBar";
import { RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText, Select, Typography } from "@material-ui/core";

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
        // this.handleYearStudyInput = this.handleYearStudyInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInterestText = this.handleInterestText.bind(this);
        // this.goResults = this.goResults.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }
    
    async componentDidMount() {
        var isLoggedIn = await isTokenAccepted(this.props.token);
        this.setState({isLoggedIn: await isLoggedIn, isAuthenticating:false});
    }

    // componentDidMount() {
    //     this.handleValidation();
    //     console.log("ERR " + this.state.errors["yearOfStudy"]);
    // }

    submitForm(event) {
        event.preventDefault();

        if(this.handleValidation()){
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
                pathname:'/buddy-finder-result',
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
           // alert("Invalid Form. Please fill in all fields with valid inputs.")
        }

    }

    // goResults() {
    //     this.props.history.push({
    //         pathname:'/buddy-finder-result',
    //         state: {
    //             educationLevel: this.state.educationLevel,
    //             yearOfStudy: this.state.yearOfStudy,
    //             interest: this.state.interest,
    //             gender: this.state.gender,
    //             googleID: this.props.profile[0].googleId
    //         }
    //     });
    // }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value.trim();
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(`Input name ${name}. Input value ${value}.`);

        // this.handleValidation();
    }

    handleInterestText(event) {
        this.setState({interestField: event.target.value.trim()});
        this.setState({interest: event.target.value.trim()});
        console.log(`Input text interest. Input value ${event.target.value.trim()}.`);
    }

    handleValidation() {
        // let errors = {};
        let formIsValid = true;

        if (this.state.gender == null) {
            this.state.errors["gender"] = "Gender field cannot be empty";
            formIsValid = false;
        } 
        // if (this.state.gender != null) {
        //     if(!this.state.gender.match(/^[a-zA-Z]+$/)){
        //         formIsValid = false;
        //         this.state.errors["gender"] = "Gender field cannot be empty";
        //      } 
        // }

        // if (this.state.yearOfStudy == null) {
        //     this.state.errors["yearOfStudy"] = "YearOfStudy field cannot be empty";
        //     formIsValid = false;
        // }

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

        
        if (this.state.interest == null) {
            this.state.errors["interest"] = "Interest field cannot be empty";
            formIsValid = false;
        } 
        
        this.forceUpdate();
        return formIsValid;
    }



    render() {
        if (this.state.isAuthenticating) {
            return <Container>
              <CircularProgress/>
            </Container>
        }
        if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
        return <Redirect to="/"/>
        }
        return (
            <div>
                <NavBar history={this.props.history}/>
                <Col>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <Typography variant="h3">Find your ideal study buddy</Typography> 
                        <Typography variant="h6">Fill in the desired attributes in your study buddy</Typography>
                    </div>
                    <div>
                        <Form style={styles.form}>
                            <fieldset>
                                <Form.Group as={Row} onSubmit={this.findBuddy} style={{padding: "1rem"}}>
                                    <Form.Label as="legend" column sm={2} style={{ bottom: "1rem", fontWeight: "800", right: "1rem" }}>Gender</Form.Label>
                                        <Col sm={7} style={{ left: "3rem" }}>
                                        <RadioGroup>
                                            <FormControlLabel
                                                label="Female"
                                                name="gender"
                                                value="female"
                                                control={<Radio />}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormControlLabel
                                                label="Male"
                                                name="gender"
                                                value="male"
                                                control={<Radio />}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormControlLabel
                                                label="Other"
                                                name="gender"
                                                value="other"
                                                control={<Radio />}
                                                onChange={this.handleInputChange}
                                            />
                                        </RadioGroup>
                                        </Col>
                                    <span style={{color: "red", right: "3rem"}}>{this.state.errors["gender"]}</span>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2} style={{ fontWeight: "800", bottom: "1.5rem"}}>Education</Form.Label>
                                    <Col sm={7} style={{left: "1rem"}}>
                                        <FormControl variant="outlined">
                                            <Select
                                                native
                                                onChange={this.handleInputChange}
                                                inputProps={{
                                                    name: "educationLevel",
                                                    id: "educationLevel",
                                                }}
                                            >
                                                <option>Primary</option>
                                                <option>Secondary</option>
                                                <option>Polytechnic</option>
                                                <option>Junior College</option>
                                                <option>University</option>
                                            </Select>
                                        <FormHelperText>Level</FormHelperText>
                                    </FormControl>
                                </Col>
                                <Col sm={3}>
                                    <FormControl variant="outlined">
                                        <Select
                                            native
                                            onChange={this.handleInputChange}
                                            inputProps={{
                                                name: "yearOfStudy",
                                                id: "yearOfStudy",
                                            }}
                                        >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                        </Select>
                                        <FormHelperText>Year of study</FormHelperText>
                                    </FormControl>
                                    <span style={{color: "red", left: "3rem"}}>{this.state.errors["yearOfStudy"]}</span>
                                </Col>
                            </Form.Group>
                            <fieldset>
                                <Form.Group as={Row} onChange={this.handleInputChange}>
                                    <Form.Label as="legend" column sm={2} style={{ bottom: "1rem", fontWeight: "800"}}>Interests</Form.Label>
                                        <Col sm={7} style={{ left: "3rem" }}>
                                            <RadioGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                        id="interest"
                                                    name="interest"
                                                    value="Math"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="Math"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    id="interest"
                                                    name="interest"
                                                    value="General Paper"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="General Paper"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    id="interest"
                                                    name="interest"
                                                    value="Chemistry"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="Chemistry"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    id="interest"
                                                    name="interest"
                                                    value="Chemistry"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="Chemistry"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    id="interest"
                                                    name="interest"
                                                    value="Computing"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="Computing"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    id="interest"
                                                    name="interest"
                                                    value="Economics"
                                                    disabled={this.state.interestField}
                                                />
                                            }
                                            label="Economics"
                                        />
                                        </RadioGroup>
                                        <Form.Control type="input" id="interest" name="this.state.name" placeholder="Others" onChange={this.handleInterestText}/>
                                        <span style={{color: "red"}}>{this.state.errors["interest"]}</span>
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>Email</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="email" placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>Password</Form.Label>
                                <Col sm={10}>
                                <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="formHorizontalCheck">
                                <Col sm={{ span: 10, offset: 2 }}>
                                <Form.Check label="Remember my options" />
                                </Col>
                            </Form.Group> */}

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                <Button onClick={this.submitForm} type="submit">Submit</Button>
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
        padding: "3rem",
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

export default connect(mapStateToProps, {}) (BuddyFinderForm);