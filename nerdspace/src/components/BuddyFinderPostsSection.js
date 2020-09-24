import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { Col, Row, Button, Image, FormControl } from 'react-bootstrap';
import BuddyPost from "./BuddyPost";

class BuddyFinderPostsSection extends React.Component {

    constructor() {
        super();
        this.state = {
            forms: []
        }

        this.submitPost = this.submitPost.bind(this);
        this.deletePost = this.deletePost.bind(this);

    }

    componentDidMount() {
        axios.get(`http://localhost:5000/buddyfinder-posts`)
          .then(res => {
            this.setState({posts: res.data.data});
          });
      }

    submitPost(id) {

    }


    render() {
        return (
            <Card style={styles.card}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>Saved Forms</Card.Title>
                            {this.state.forms.map((form) => {
                                return <BuddyPost
                                key={form.key}
                                id={form.key}
                                content={form.content}
                                title={form.title}
                                submitPost={form.submitPost}/>;
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
