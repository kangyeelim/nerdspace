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
            interests: [],
            interestsText: "",
            gender: null,
            educationLevel: null,
            yearOfStudy: null,
            // key: null,
            isAuthenticating: true,
            isLoggedIn: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleInterestText = this.handleInterestText.bind(this);
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
    }

    handleInterest(event) {
        if (event.target.checked) {
            this.state.interests.push(event.target.value);
            this.setState({ interests: this.state.interests });
        } else {
            if (this.state.interests.includes(event.target.value)) {
                this.state.interests.splice(this.state.interests.indexOf(event.target.value), 1);
                this.setState({ interests: this.state.interests });
            }
        }
        console.log(this.state.interests);
    }

    handleInterestText(event) {
        this.setState({ interestsText: event.target.value.trim() });
        console.log(`Input text interest. Input value ${event.target.value.trim()}.`);
    }

    onSubmit = event => {
        event.preventDefault();

        if (this.state.gender == null) {
            alert("Please indicate your gender");
            return;
        }

        if (this.state.educationLevel == null) {
            alert("Please indicate your education level");
            return;
        }

        if (this.state.yearOfStudy == null) {
            alert("Please indicate your year of study");
            return;
        }

        if (this.state.educationLevel == "Secondary") {
            if (parseInt(this.state.yearOfStudy) > 5) {
                alert("Year of study in Secondary cannot go beyond 5");
                return;
            }
        } else if (this.state.educationLevel == "Polytechnic") {
            if (parseInt(this.state.yearOfStudy) > 3) {
                alert("Year of study in Polytechnic cannot go beyond 3");
                return;
            }
        } else if (this.state.educationLevel == "Junior College") {
            if (parseInt(this.state.yearOfStudy) > 2) {
                alert("Year of study in Junior College cannot go beyond 2");
                return;
            }
        } else if (this.state.educationLevel == "University") {
            if (parseInt(this.state.yearOfStudy) > 5) {
                alert("Year of study in University cannot go beyond 5");
                return;
            }
        }

        if (this.state.interests.length < 1 && this.state.interestsText.length < 1) {
            alert("Please add an interest");
            return;
        }

        var intArray = this.state.interestsText.split(",");
        var i;
        for (i of intArray) {
            if (i.trim().length > 0) {
                this.state.interests.push(i.trim());
            }
        }

        this.setState({interests: this.state.interests});
        
        axios.post('http://localhost:5000/profiles/updateProfile', {
            educationLevel: this.state.educationLevel,
            yearOfStudy: this.state.yearOfStudy,
            interests: this.state.interests,
            gender: this.state.gender,
            email: this.props.profile[0].email,
            name: this.state.name,
            key: this.props.profile[0].googleId,
            bio: this.state.bio,
            imageUrl: this.state.profilePic
        })
        .catch(err => {
            console.error(err);
        })
        .then((response) => {
            console.log(response.data);
        });

        alert('Your information has been successfully updated ' + this.state.name + this.state.bio + this.state.email + "Education: " + this.state.educationLevel + this.state.yearOfStudy + "Gender: " + this.state.gender);
    };

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
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="input-group" style={styles.bar}>
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
                        <div className="input-group" style={styles.bar}>
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
                        <div className="input-group" style={styles.bar}>
                            <label style={styles.bioLabel}>Bio: </label>
                            <textarea
                                type="input"
                                className="form-control"
                                id="bio"
                                name="bio" 
                                placeholder="Describe yourself (e.g. likes, dislikes, favourite subjects)"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div> Interests: </div>
                        <div className="input-group" style={styles.bar}>
                            <ul style={{listStyleType:"none"}}>
                                <li><input type="checkbox" id="Math" value="Math" onChange={this.handleInterest}/><label for="Math"> Math </label> </li>
                                <li><input type="checkbox" id="General Paper" value="General Paper" onChange={this.handleInterest}/><label for="General Paper"> General Paper </label> </li>
                                <li><input type="checkbox" id="Chemistry" value="Chemistry" onChange={this.handleInterest}/><label for="Chemistry"> Chemistry </label></li>
                                <li><input type="checkbox" id="Physics" value="Physics" onChange={this.handleInterest}/><label for="Physics"> Physics </label></li>
                                <li><input type="checkbox" id="Computing" value="Computing" onChange={this.handleInterest}/><label for="Computing"> Computing </label></li>
                                <li><input type="checkbox" id="Economics" value="Economics" onChange={this.handleInterest}/><label for="Economics"> Economics </label></li>
                            </ul>
                        </div>
                        <Form.Control type="input" id="interest" name="interests" placeholder="Others" onChange={this.handleInterestText} />
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
