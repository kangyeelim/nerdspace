import React from 'react';
import GoogleButton from '../components/GoogleLoginButton';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile } from '../redux/actions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    }
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
    this.addUserOnFirstLogin = this.addUserOnFirstLogin.bind(this);
  }

  componentDidMount() {
    //check if user is authenticated already and redirect if yes
    if (this.props.profile.length > 0) {
      this.setState({isAuthenticated: true});
    }
  }

  responseGoogleSuccess(response) {
    const profile = response.profileObj;
    this.props.updateProfile(profile);
    //adds user in database on first login
    this.addUserOnFirstLogin(profile, () => {
      this.setState({isAuthenticated: true})
      }, () => {
        alert("Login failed. Please try again.")
      });
  }

  addUserOnFirstLogin(profile, _callback, _callback2) {
    axios.get(`http://localhost:5000/users/byGoogleID/${profile.googleId}/`)
    .then((response) => {
      if (response.data.message == 'User does not exist.') {
        axios.post('http://localhost:5000/users', {
          name: profile.name,
          imageUrl: profile.imageUrl,
          googleID: profile.googleId,
          email: profile.email,
        })
        .catch(err => {
          _callback2();
        })
      }
    })
    .then(() => {
      _callback();
    })
    .catch(err => {
      _callback2();
    })
  }

  responseGoogleFailure(response) {
    alert("Login failed. Please try again.");
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/home"/>
    }
    return (
      <div>
        <div style={styles.screen}>
          <div style={styles.loginPanel}>
            <h3>Welcome to Nerdspace!</h3>
            <p>Login to get started.</p>
            <div style={{marginTop:30}}>
              <GoogleButton
                responseGoogleSuccess={this.responseGoogleSuccess}
                responseGoogleFailure={this.responseGoogleFailure}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  screen: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "skyblue"
  },
  loginPanel: {
    width: "385px",
    height: "auto",
    padding: 30,
    backgroundColor: "white",
    paddingTop: "35vh",
  }
}
const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile}) (Login);
