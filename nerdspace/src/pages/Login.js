import React from 'react';
import GoogleButton from '../components/GoogleLoginButton';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile, updateToken } from '../redux/actions';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticating: true,
      isLoggedIn: false
    }
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
    this.addUserOnFirstLogin = this.addUserOnFirstLogin.bind(this);
    this.addToken = this.addToken.bind(this);
  }

  async componentDidMount() {
    if (await isTokenAccepted(this.props.token)) {
      this.setState({isLoggedIn:true});
    }
    this.setState({isAuthenticating:false});
  }

  responseGoogleSuccess(response) {
    const profile = response.profileObj;
    const token = response.tokenObj;
    //adds user in database on first login
    (async () => {
        profile.googleId = await this.addUserOnFirstLogin(profile, () => {
            this.setState({ isLoggedIn: true })
        }, () => {
            alert("Login failed. Please try again.")
        });
        this.props.updateProfile(profile);
    })();
    this.props.updateToken(token);
    this.addToken(token);
  }

  async addUserOnFirstLogin(profile, _callback, _callback2) {
    var key;
    await axios.get(`http://localhost:5000/users/byGoogleID/${profile.googleId}/`)
    .then((response) => {
      if (response.data.message == 'User does not exist.') {
        console.log("Doesn't exist");
        axios.post('http://localhost:5000/users', {
          name: profile.name,
          imageUrl: profile.imageUrl,
          googleID: profile.googleId,
          email: profile.email,
        })
        .catch(err => {
            _callback2();
        })
        .then((response) => {
            console.log(response.data.key);
            key = response.data.key;
            console.log("Within: " + key);
        });
      } else {
          console.log("Exists");
          key = response.data.data[0].key;
          console.log("Within: " + key);
      }
    })
    .then(() => {
      _callback();
    })
    .catch(err => {
      _callback2();
    })
    console.log("Outside:" + key);
    return key;
  }

  addToken(token) {
    axios.get(`http://localhost:5000/tokens/byAccessToken/${token.access_token}`)
      .then((response) => {
        if (response.data.message == 'Token does not exist.') {
          axios.post(`http://localhost:5000/tokens`, {
            access_token: token.access_token,
            token_id: token.id_token,
            session_state: {
              expires_in: token.expires_in,
              expires_at: token.expires_at,
              first_issued_at: token.first_issued_at
            }
          })
          .catch(err => {
            console.error(err);
          })
        } else {
          axios.post(`http://localhost:5000/tokens/update`, {
            access_token: token.access_token,
            token_id: token.token_id,
            session_state: {
              expires_in: token.expires_in,
              expires_at: token.expires_at,
              first_issued_at: token.first_issued_at
            }
          })
          .catch(err => {
            console.error(err);
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  responseGoogleFailure(response) {
    alert("Login failed. Please try again.");
  }

  render() {
    if (!this.state.isAuthenticating && this.state.isLoggedIn) {
        return <Redirect to="/home" />
    }
    if (this.state.isAuthenticating) {
      return <Container>
        <CircularProgress/>
      </Container>
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
      token: state.token
    }
}

export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile, updateToken: updateToken}) (Login);
