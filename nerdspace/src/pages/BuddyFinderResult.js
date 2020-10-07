import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import BuddyResult from '../components/BuddyResult';

class BuddyFinderResult extends React.Component {

    constructor() {
        super();
        this.state = {
            results: [],
            isLoading: true
          }
        this.goToBuddyFinder = this.goToBuddyFinder.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        var matchingRes = [];
        var results = [];
        axios.get(`http://localhost:5000/profiles/getBuddy/${this.props.profile[0].googleId}/${this.props.location.state.gender}/${this.props.location.state.educationLevel}/${this.props.location.state.yearOfStudy}/${this.props.location.state.interest}`)
        .then(res => {
            console.log(res);
            matchingRes = res.data.data;
            matchingRes.forEach(res => {
              var googleID = res.googleID;
              //axios to get the the user obj from db using googleID
              //add the name and email to the res obj
              //add res to the results array
            })
            this.setState({results:results});
            this.setState({isLoading: false});
            //this.setState({results: res.data.data});
            // this.setState({results: res.docs.data});
          });
    }

    goToBuddyFinder() {
        this.props.history.push('/buddy-finder');
    }

    sendMessage() {

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
                    <div style={styles.header}>
                        <h1 style={styles.headerText}><strong>Results</strong></h1>
                        <Button variant="primary" onClick={this.props.goToBuddyFinder}>Return to Buddy Finder main page</Button>
                    </div>
                    <CardDeck>
                        <Card>
                        {!this.state.isLoading && this.state.results.map((result) => {
                            return <BuddyResult
                            key={result.key}
                            id={result.key}
                            // name={result.name}
                            gender={result.gender}
                            // email={result.email}
                            educationLevel={result.educationLevel}
                            sendMessage={this.sendMessage}/>;
                        })}
                        </Card>
                    </CardDeck>
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
        margin: "2rem",
        padding: "3rem",
        textAlign: "center",
        justifyContent: "center",
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
    },
    headerText: {
        margin: "2rem"
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (BuddyFinderResult);
