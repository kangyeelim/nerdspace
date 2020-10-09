import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import BuddyFinderHeader from '../components/BuddyFinderHeader';
import BuddyFinderPostsSection from '../components/BuddyFinderPostsSection';

class BuddyFinder extends React.Component {

    constructor() {
        super();
        this.state = {
            viewAllPosts: false,
          }
        this.createBuddyForm = this.createBuddyForm.bind(this);
    }

    createBuddyForm() {
        this.props.history.push('/createBuddyForm');
    }

    // handleGenderInput(event) {
    //     this.setState({gender:event.currentTarget.value});
    //     console.log(event.currentTarget.value);
    // }

    render() {
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
    }
}

export default connect(mapStateToProps, {}) (BuddyFinder);