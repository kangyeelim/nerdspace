import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import axios from 'axios';
import { Col, Row, Button, Image, FormControl } from 'react-bootstrap';
import BuddyPost from "./BuddyPost";

class BuddyFinderPostsSection extends React.Component {

    constructor() {
        super();
        this.state = {
            forms: [],
        }

        this.submitPost = this.submitPost.bind(this);
        this.deletePost = this.deletePost.bind(this);

    }

    componentDidMount() {
        axios.get(`http://localhost:5000/buddyfinderposts/byGoogleID/${this.props.profile[0].googleId}`)
          .then(res => {
            this.setState({ forms: res.data.data });
          });
    }
    
    async submitPost(id, gender, educationLevel, yearOfStudy, interest) {
        console.log(gender + educationLevel + interest + id + "THISS");
        this.props.history.push({
            pathname:'/buddy-finder-result',
            state: {
                gender: gender,
                educationLevel: educationLevel,
                yearOfStudy: yearOfStudy,
                interest: interest,
                googleID: this.props.profile[0].googleId
            }
        });
        console.log(gender + educationLevel + interest + id + "THISS");
    }

    async deletePost(id) {
        // event.preventDefault();
        axios.delete(`http://localhost:5000/buddyfinderposts/${id}`)
        .catch(err => {
            console.error(err);
        });
        axios.get(`http://localhost:5000/buddyfinderposts/byGoogleID/${this.props.profile[0].googleId}`)
          .then(res => {
            this.setState({ forms: res.data.data });
        });

    }

    render() {
        return (
            <Card style={styles.card}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title style={{fontSize: 50, fontWeight: 600}}>Saved Forms</Card.Title>
                            {this.state.forms.map((form) => {
                                return <BuddyPost
                                key={form.key}
                                id={form.key}
                                gender={form.gender}
                                educationLevel={form.educationLevel}
                                yearOfStudy={form.yearOfStudy}
                                interest={form.interest}
                                submitPost={this.submitPost}
                                deletePost={this.deletePost}/>;
                            })}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (BuddyFinderPostsSection);
