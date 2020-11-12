import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card } from 'react-bootstrap';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { FormControl, FormHelperText, Select, Avatar, Checkbox, FormLabel, RadioGroup, Radio, FormControlLabel, FormGroup, TextField, Button, List } from "@material-ui/core";
import NavBar from "../components/NavigationComponents/NavBar";

const ARRAY_OF_DEFAULT_INTERESTS = ["Math", "GP", "Chemistry", "Physics", "Computing", "Economics"];

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePic : this.props.profile[0].imageUrl,
            email: this.props.profile[0].email,
            bio: null,
            interests: [],
            interestsText: "",
            gender: null,
            educationLevel: null,
            yearOfStudy: null,
            // key: null,
            isAuthenticating: true,
            isLoggedIn: false,
            interestsList: ARRAY_OF_DEFAULT_INTERESTS,
            isExistingProfileFound: false,
            existingProfile:null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleInterestText = this.handleInterestText.bind(this);
        this.addToInterestList = this.addToInterestList.bind(this);
        this.loadProfileInformation = this.loadProfileInformation.bind(this);
    }

    componentDidMount = async () => {
      var isLoggedIn = await isTokenAccepted(this.props.token);
      await this.loadProfileInformation();
      this.setState({isLoggedIn: isLoggedIn, isAuthenticating:false});
    }

    async loadProfileInformation() {
      try {
        var res = await axios.get(`http://localhost:5000/profiles/${this.props.profile[0].googleId}`);
        if ((await res).data.message == 'GET success') {
          this.setState({isExistingProfileFound:true, existingProfile: res.data.data,
            bio: res.data.data.bio});
        }
        console.log("here")
      } catch(err) {
        this.setState({isExistingProfileFound:false});
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

    addToInterestList() {
      this.state.interestsList.push(this.state.interestsText);
      this.setState({interestsList: this.state.interestsList, interestsText:""});
    }

    onSubmit = async event => {
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

        if (this.state.bio == null) {
            alert("Please include a bio");
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

        if (this.state.interests.length < 1) {
            alert("Please add an interest");
            return;
        }

        this.setState({interests: this.state.interests});

        axios.post('http://localhost:5000/profiles/updateProfile', {
            educationLevel: this.state.educationLevel,
            yearOfStudy: this.state.yearOfStudy,
            interests: this.state.interests,
            gender: this.state.gender,
            email: this.props.profile[0].email,
            name: this.props.profile[0].name,
            key: this.props.profile[0].googleId,
            bio: this.state.bio,
            imageUrl: this.state.profilePic
        })
        .catch(err => {
            console.error(err);
        })
        .then(async (response) => {
            await this.loadProfileInformation();
            console.log(response.data);
        });

        alert('Your information has been successfully updated ');
    };

    render() {
      if (this.state.isAuthenticating) {
        return <div className="container" style={{margin:"auto"}}>
          <CircularProgress/>
        </div>
      }
      if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
        return <Redirect to="/"/>
      }
        return (
          <div>
            <NavBar history={this.props.history} />
              <div style={styles.container}>
                <Col>
                <form className="form" onSubmit={this.onSubmit}>
                <Col>
                <Card style={styles.card} >
                  <Avatar
                    style={{
                      width: "150px",
                      height: "150px",
                      margin: "auto"
                    }}
                    src={this.state.profilePic}
                    alt="Profile"
                  />
                  <Card.Title style={{marginTop: "20px"}}> {this.props.profile[0].name}</Card.Title>
                  {this.state.isExistingProfileFound && (<Card.Body>
                  <Col>
                    <div><strong>Bio:</strong> {this.state.existingProfile.bio}</div>
                    <div><strong>Gender:</strong> {this.state.existingProfile.gender}</div>
                    <div>
                    <div style={styles.card}>
                    <strong>My Interests:</strong>
                    {Object.values(this.state.existingProfile.interest).map((interest) => {
                      return <List>{interest}</List>
                    })}
                    </div>
                    </div>
                    </Col>
                  </Card.Body>)}
                  </Card>
                {this.state.isExistingProfileFound && (<div style={styles.bar}><h4 style={styles.heading}>Update your profile</h4></div>)}
                {!this.state.isExistingProfileFound && (<div style={styles.bar}><h4 style={styles.heading}>Add profile information</h4></div>)}
                  <div className="input-group" style={styles.bar}>
                    <TextField
                      variant="outlined"
                      label="Bio"
                      id="bio"
                      name="bio"
                      multiline
                      rows={4}
                      rowsMax={10}
                      onChange={this.handleInputChange}
                      style={{width:"40vw"}}
                    />
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup>
                      <FormControlLabel
                        label="Female"
                        name="gender"
                        value="Female"
                        control={<Radio />}
                        onChange={this.handleInputChange}
                      />
                      <FormControlLabel
                        label="Male"
                        name="gender"
                        value="Male"
                        control={<Radio />}
                        onChange={this.handleInputChange}
                      />
                    </RadioGroup>
                    <span style={{ color: "red", right: "3rem" }}>{}</span>
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Education</FormLabel>
                    <FormControl variant="outlined" style={{ padding: "10px" }}>
                      <Select
                        native
                        onChange={this.handleInputChange}
                        inputProps={{
                          name: "educationLevel",
                          id: "educationLevel",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option>Primary</option>
                        <option>Secondary</option>
                        <option>Polytechnic</option>
                        <option>Junior College</option>
                        <option>University</option>
                      </Select>
                      <FormHelperText>Level</FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined">
                      <Select
                        native
                        onChange={this.handleInputChange}
                        inputProps={{
                          name: "yearOfStudy",
                          id: "yearOfStudy",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                      </Select>
                      <FormHelperText>Year of study</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Interests</FormLabel>
                    <FormGroup column>
                      {this.state.interestsList.map((interest) => {
                          return <FormControlLabel
                            control={
                              <Checkbox
                                onChange={this.handleInterest}
                                id={interest}
                                value={interest}
                              />
                            }
                            label={interest}
                          />
                      })}
                      <Row>
                      <TextField
                        id="interest"
                        name="interests"
                        placeholder="Others"
                        value={this.state.interestsText}
                        onChange={this.handleInterestText}
                      />
                      <Button onClick={this.addToInterestList}>Add as option</Button>
                      </Row>
                    </FormGroup>
                    <div className="input-group" style={styles.bar}>
                      <Button
                        style={{marginTop: "20px"}}
                        type="submit"
                        size="medium"
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  </Col>
                </form>
              </Col>
            </div>
          </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2rem",
        textAlign: "center",
        justifyContent: "center",
    },
    bar: {
        padding: "20px",
        justifyContent:'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        margin: "auto",
    },
    card: {
      marginTop: "30px",
      paddingTop: "20px",
      backgroundColor: "#e1f2fb",
      color: "#3282b8",
      border: "none",
    },
    heading: {
      marginTop: "30px",
      marginLeft: "20px"
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (Profile);
