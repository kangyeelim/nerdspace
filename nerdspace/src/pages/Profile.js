import React from 'react';
import { connect } from 'react-redux';
import { Col, Container } from 'react-bootstrap';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { FormControl, FormHelperText, Select, Avatar, Checkbox, Typography, FormLabel, RadioGroup, Radio, FormControlLabel, FormGroup, TextField, Button } from "@material-ui/core";
import Header from "../components/NavigationComponents/Header";

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
            <Header history={this.props.history} />
            <div className="container">
              <Col>
                <Avatar
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                  src={this.state.profilePic}
                  alt="Profile"
                />
                <form className="form" onSubmit={this.onSubmit}>
                  <div className="input-group" style={styles.bar}>
                    <TextField
                      label="Name"
                      id="name"
                      name="name"
                      placeholder={this.props.profile[0].name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Gender:</FormLabel>
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
                    <span style={{ color: "red", right: "3rem" }}>{}</span>
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Education Level:</FormLabel>
                    <FormControl style={{ padding: "10px" }}>
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
                      <FormHelperText>Education Level</FormHelperText>
                    </FormControl>
                    <FormControl>
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
                    <TextField
                      variant="outlined"
                      label="Bio"
                      id="bio"
                      name="bio"
                      multiline
                      rows={5}
                      rowsMax={10}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="input-group" style={styles.bar}>
                    <FormLabel component="legend">Interests:</FormLabel>
                    <FormGroup column>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="Math"
                            value="Math"
                          />
                        }
                        label="Math"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="General Paper"
                            value="General Paper"
                          />
                        }
                        label="General Paper"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="Chemistry"
                            value="Chemistry"
                          />
                        }
                        label="Chemistry"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="Physics"
                            value="Physics"
                          />
                        }
                        label="Physics"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="Computing"
                            value="Computing"
                          />
                        }
                        label="Computing"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleInterest}
                            id="Economics"
                            value="Economics"
                          />
                        }
                        label="Economics"
                      />
                      <TextField
                        id="interest"
                        name="interests"
                        placeholder="Others"
                        onChange={this.handleInterestText}
                      />
                    </FormGroup>
                    <div className="input-group" style={styles.bar}>
                      <Button
                        type="submit"
                        size="medium"
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </Col>
            </div>
          </div>
        );
    }
}

const styles = {
    bar: {
        width: '70vw',
        padding: "10px",
        justifyContent:'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (Profile);
