import React from 'react';
import GoogleLogin from 'react-google-login';

export default function GoogleButton(props) {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <GoogleLogin
    clientId= {GOOGLE_CLIENT_ID}
    buttonText="Login with Google"
    onSuccess={props.responseGoogleSuccess}
    onFailure={props.responseGoogleFailure}
    responseType='code,token'
    cookiePolicy={'single_host_origin'}
    />
  );
}
