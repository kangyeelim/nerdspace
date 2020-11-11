import React from "react";
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
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
        let count = 1;

        return (
            <div style={styles.card}>

                          <h2>Saved Forms</h2>
                            {this.state.forms.map((form) => {
                                return (
                                  <BuddyPost
                                  key={form.key}
                                  id={form.key}
                                  index={count++}
                                  gender={form.gender}
                                  educationLevel={form.educationLevel}
                                  yearOfStudy={form.yearOfStudy}
                                  interest={form.interest}
                                  submitPost={this.submitPost}
                                  deletePost={this.deletePost}/>
                                );
                            })}
            </div>
        );
    }
}

const styles = {
    card: {
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
  }
}

export default connect(mapStateToProps, {}) (BuddyFinderPostsSection);
