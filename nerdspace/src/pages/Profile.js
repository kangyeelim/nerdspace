import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePic : this.props.profile[0].imageUrl,
            name: this.props.profile[0].name,
            email: this.props.profile[0].email,
            bio: null,
            interests: null,
            gender: null,
            educationLevel: null,
            yearOfStudy: null,
            interestField: null,
            // key: null,
            isAuthenticating: true,
            isLoggedIn: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleInterestText = this.handleInterestText.bind(this);
        console.log(this.state.name)
    }

    componentDidMount = async () => {
      var isLoggedIn = await isTokenAccepted(this.props.token);
      this.setState({isLoggedIn: isLoggedIn, isAuthenticating:false});
    }

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

    onSubmit = event => {
        event.preventDefault();
        // const name = this.name.value;
        // const bio = this.bio.value;
        // const info = {name: name, bio: bio};
        // const data = [...this.state.data, info];
        // this.setState({
        //     data: data,
        // });

        
        // axios.post('http://localhost:5000/profile/${this.props.profile[0].googleId}', {
        //     educationLevel: this.state.educationLevel,
        //     yearOfStudy: this.state.yearOfStudy,
        //     interests: this.state.interests,
        //     gender: this.state.gender,
        //     email: this.props.profile[0].email,
        //     name: this.props.profile[0].name,
        //     googleID: this.props.profile[0].googleId,
        //     key: this.state.key
        // })
        // .catch(err => {
        //     console.error(err);
        // });

        alert('Your information has been successfully updated ' + this.state.name + this.state.bio + this.state.email + "Education: " + this.state.educationLevel + this.state.yearOfStudy + "Gender: " + this.state.gender);
    };

    // handleSubmit = event => {
    //     event.preventDefault();
    //     alert('Your username is: ' + this.input.value + this.bio.value);
    // };

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
                <div className="container">
                <Col>
                    <Row style={styles.image}>
                    <img className="thumbnail-image"
                        src={this.state.profilePic}
                    />
                    </Row>
                    <Row>
                    <form className="form" onSubmit={this.onSubmit} onChange={this.handleInputChange}>
                        <div className="input-group" style={styles.bar} onChange={this.handleInputChange}>
                            <label style={styles.nameLabel} >Name: </label>
                            <input
                                type="input"
                                className="form-control"
                                placeholder={this.props.profile[0].name}
                            />
                        </div>
                        <div className="input-group" style={styles.bar} onChange={this.handleInputChange}>
                            <label style={styles.nameLabel} >Gender: </label>
                                <Row>
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
                                </Row>
                                <span style={{color: "red", right: "3rem"}}>{}</span>
                        </div>
                        <div className="input-group" style={styles.bar} onChange={this.handleInputChange}>
                            <label style={styles.bioLabel}>EducationLevel: </label>
                            <Row sm={7} style={{left: "1.5rem"}}>
                                    <Form.Control as="select" id="educationLevel" name="educationLevel" onChange={this.handleInputChange}>
                                        <option>Primary</option>
                                        <option>Secondary</option>
                                        <option>Polytechnic</option>
                                        <option>Junior College</option>
                                        <option>University</option>
                                    </Form.Control>
                                </Row>
                                <Row sm={3} style={{left: "1.5rem"}}>
                                    <Form.Control required as="select" id="yearOfStudy" name="yearOfStudy" placeholder="Year of study" onChange={this.handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Form.Control>
                                    <span style={{color: "red", left: "3rem"}}>{}</span>
                                </Row>
                        </div>
                        <div className="input-group" style={styles.bar} onChange={this.handleInputChange}>
                            <label style={styles.bioLabel}>Bio: </label>
                            <textarea
                                type="input"
                                className="form-control"
                                id="bio"
                                name="bio" 
                                placeholder="Describe yourself (e.g. likes, dislikes, favourite subjects)"
                            />
                        </div>
                        <div className="input-group" style={styles.bar} onChange={this.handleInputChange}>
                            <Form.Label as="legend" column style={styles.bioLabel} >Interests</Form.Label>
                                <Row>
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
                                    <Form.Control type="input" id="interest" name="this.state.name" placeholder="Others" onChange={this.handleInterestText}/>
                                    <span style={{color: "red"}}>{}</span>
                                </Row>
                            </div>

                        <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Save</button>
                    </form>
                    </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

const Card = props =>
    <div className="col-md-6 col-lg-3">
        <div className="card mb-3">
            <div className="card-body">
                <p className="card-title"><span>Name: </span>{props.info.name}</p>
                <p className="card-text">
                    <span>Bio: </span>{props.info.bio}
                </p>
            </div>
        </div>
    </div>;

const styles = {
    bar: {
        width: '70vw',
        margin: '40px',
        justifyContent:'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    nameLabel: {
        marginRight: '10px',
        fontWeight: 'bold',
    },
    bioLabel: {
        marginRight: '30px',
        fontWeight: 'bold',
    },
    image: {
        justifyContent:'center',
        alignSelf: 'center',
    },
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (Profile);
