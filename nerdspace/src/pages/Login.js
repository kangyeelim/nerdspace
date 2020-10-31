import React from 'react';
import GoogleButton from '../components/GoogleLoginButton';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile, updateToken } from '../redux/actions';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from "../assets/logoV2.png";

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

  async responseGoogleSuccess(response) {
    const profile = response.profileObj;
    const token = response.tokenObj;
    //adds user in database on first login

    profile.googleId = await this.addUserOnFirstLogin(profile);

    console.log(await profile.googleId);
    this.props.updateProfile(await profile);
    this.props.updateToken(token);
    this.addToken(token, profile.name);
    this.setState({ isLoggedIn: true })
  }




  async addUserOnFirstLogin(profile) {
    var key;
    try {
      var response = await axios.get(`http://localhost:5000/users/byEmail`, {
            params: {
                email: profile.email
            }
        });
      if ((await response).data.message == 'User does not exist.') {
        try {
          var res = await axios.post('http://localhost:5000/users', {
                name: profile.name,
                imageUrl: profile.imageUrl,
                email: profile.email,
            });
          return (await res).data.data;
        } catch (err) {
          alert('Login failed. Please try again.');
          console.error(err);
        }
      } else {
        return response.data.data;
      }
    } catch (err) {
      alert('Login failed. Please try again.');
      console.error(err);
    }
  }

  addToken(token, name) {
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
            },
            name: name
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
            },
            name:name
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
            <h3>Welcome!</h3>
            <p>Login to get started.</p>
            <div style={{ marginTop: 30 }}>
              <GoogleButton
                responseGoogleSuccess={this.responseGoogleSuccess}
                responseGoogleFailure={this.responseGoogleFailure}
              />
            </div>
          </div>
          <div style={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  screen: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "skyblue",
  },
  loginPanel: {
    width: "385px",
    height: "auto",
    padding: 30,
    backgroundColor: "white",
    paddingTop: "35vh",
  },
  logo: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bbe1fa",
  },
};
const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile, updateToken: updateToken}) (Login);
