import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Col, Row, Form, Button, Image, Card, FormControl, Container } from 'react-bootstrap';
import BuddyFinderHeader from '../../components/BuddyFinderComponents/BuddyFinderHeader';
import BuddyFinderPostsSection from '../../components/BuddyFinderComponents/BuddyFinderPostsSection';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      this.setState({isLoggedIn: isLoggedIn, isAuthenticating:false});
    }

    createBuddyForm() {
        this.props.history.push('/createBuddyForm');
    }

    // handleGenderInput(event) {
    //     this.setState({gender:event.currentTarget.value});
    //     console.log(event.currentTarget.value);
    // }

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
                <div style={styles.container}>
                    <Col>
                        <BuddyFinderHeader createBuddyForm={this.createBuddyForm} />
                        <BuddyFinderPostsSection history={this.props.history}/>
                    </Col>
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        // margin: "2rem",
        // padding: "3rem",
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
