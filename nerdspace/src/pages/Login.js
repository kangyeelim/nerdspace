import React from 'react';
import GoogleButton from '../components/GoogleLoginButton';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile } from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isFailure: false,
      isSuccess: false,
    }
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }

  async componentDidMount() {
    //TO DO: check if user is authenticated already and redirect if yes
  }

  responseGoogleSuccess(response) {
    //TO DO: add to database if first time user
    this.props.updateProfile(response.profileObj);
    console.log("success");
    console.log(response.profileObj);
    this.setState({isSuccess:true});
  }

  responseGoogleFailure(response) {
    console.log("failed");
    this.setState({isFailure: true});
  }

  render() {
    if (this.state.isSuccess) {
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
