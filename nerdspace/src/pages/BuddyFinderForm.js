import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import axios from 'axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';

class BuddyFinderForm extends React.Component {

    constructor() {
        super();
        this.state = {
            gender: null,
            educationLevel: null,
            yearOfStudy: null,
            interest: null
        }
        // this.handleYearStudyInput = this.handleYearStudyInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleInterestInput = this.handleInterestInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        // event.preventDefault();
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

        goResults();

    }

    goResults() {
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

    // handleInterestInput(event) {
    //     this.setState({interest: event.target.value.trim()});
    //     console.log(`Input name interest. Input value ${event.target.value.trim()}.`);
    // }



    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                <Col>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1><strong>Find your ideal study buddy</strong></h1> 
                        <h6>Fill in the desired attributes in your study buddy</h6>
                    </div>
                    <div>
                        <Form style={styles.form}>
                            <fieldset>
                                <Form.Group as={Row} onSubmit={this.findBuddy}>
                                    <Form.Label as="legend" column sm={2}>Gender</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        id="gender"
                                        value="male"
                                        onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        id="gender"
                                        value="female"
                                        onChange={this.handleInputChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>Level of education</Form.Label>
                                <Col>
                                    <Form.Control as="select" id="educationLevel" name="educationLevel" onChange={this.handleInputChange}>
                                        <option>Primary</option>
                                        <option>Secondary</option>
                                        <option>Polytechnic</option>
                                        <option>Junior College</option>
                                        <option>University</option>
                                    </Form.Control>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control id="yearOfStudy" name="yearOfStudy" type="input" placeholder="Year of study" onChange={this.handleInputChange}/>
                                </Col>
                            </Form.Group>
                            <fieldset>
                                <Form.Group as={Row} onChange={this.handleInputChange}>
                                    <Form.Label as="legend" column sm={2}>Interests</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="Math"
                                        label="Math"
                                        />
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="General Paper"
                                        label="General Paper"
                                        />
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="Chemistry"
                                        label="Chemistry"
                                        />
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="Physics"
                                        label="Physics"
                                        />
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="Computing"
                                        label="Computing"
                                        />
                                        <Form.Check 
                                        type="radio"
                                        id="interest"
                                        name="interest"
                                        value="Economics"
                                        label="Economics"
                                        />
                                        <Form.Control type="input" id="interest" value={this.state.name} name="interest" placeholder="Others" />
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
        padding: "1rem",
        justifyContent: "left",
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (BuddyFinderForm);