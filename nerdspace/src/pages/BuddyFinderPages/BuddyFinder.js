import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import { Col, Container } from 'react-bootstrap';
import BuddyFinderHeader from '../../components/BuddyFinderComponents/BuddyFinderHeader';
import BuddyFinderPostsSection from '../../components/BuddyFinderComponents/BuddyFinderPostsSection';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../../components/NavigationComponents/NavBar";

class BuddyFinder extends React.Component {

    constructor() {
        super();
        this.state = {
            viewAllPosts: false,
            isAuthenticating: true,
            isLoggedIn: false
          }
        this.createBuddyForm = this.createBuddyForm.bind(this);
    }

    async componentDidMount() {
      var isLoggedIn = await isTokenAccepted(this.props.token);
      this.setState({isLoggedIn: await isLoggedIn, isAuthenticating:false});
    }

    createBuddyForm() {
        this.props.history.push('/createBuddyForm');
    }

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
                <BuddyFinderHeader createBuddyForm={this.createBuddyForm} />
                <BuddyFinderPostsSection history={this.props.history} />
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
        textAlign: "center",
        justifyContent: "center",

    },

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {}) (BuddyFinder);
