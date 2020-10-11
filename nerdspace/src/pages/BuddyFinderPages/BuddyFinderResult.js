import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import BuddyResult from '../../components/BuddyFinderComponents/BuddyResult';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ forceRefresh: true });

class BuddyFinderResult extends React.Component {

    constructor() {
        super();
        this.state = {
            results: [],
            chatID: "",
            noResults: false
            // isLoading: true
          }
        this.goToBuddyFinder = this.goToBuddyFinder.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // this.getUserData = this.getUserData.bind(this);
    }

    async componentDidMount() {
        await axios.get(`http://localhost:5000/profiles/getBuddy/${this.props.profile[0].googleId}/${this.props.location.state.gender}/${this.props.location.state.educationLevel}/${this.props.location.state.yearOfStudy}/${this.props.location.state.interest}`)
        .then(res => {
            console.log(res);
            if (res.length != 0) {
                this.setState({results: res.data.data});
                this.setState({noResults: false});
            } else {
                this.setState({noResults: true});
            }
            
        }).catch(err => {
            console.error(err);
        })

        if (this.state.results.length == 0) {
            this.setState({noResults: true});
        }
    }

    // async componentDidMount() {
    //     var matchingRes = [];
    //     // var results = [];
    //     axios.get(`http://localhost:5000/profiles/getBuddy/${this.props.profile[0].googleId}/${this.props.location.state.gender}/${this.props.location.state.educationLevel}/${this.props.location.state.yearOfStudy}/${this.props.location.state.interest}`)
    //     .then(res => {
    //         console.log(res);
    //         matchingRes = res.data.data;
    //         matchingRes.forEach(matchRes => {
    //             var googleID = matchRes.googleID;
    //             var name = "";
    //             var email = "";
    //             axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`)
    //               .then(profileRes => {
    //                 matchRes.name = profileRes.name;
    //                 matchRes.email  = profileRes.email;
    //                   })
    //                 //   matchRes.name = name;
    //                 //   matchRes.email = email;
    //               })
                  
                  
    //             //axios to get the the user obj from db using googleID
    //             //add the name and email to the res obj
    //             //add res to the results array
    //           })
              
    //         this.setState({results: matchingRes});
    //         this.setState({isLoading: false});
    //         //this.setState({results: res.data.data});
    //         // this.setState({results: res.docs.data});
    //     //   });
    //     //   this.setState({isLoading: true});
    //     // this.getUserData();
    // }

    goToBuddyFinder() {
        history.push('/buddy-finder');
    }

    async sendMessage(googleID) {
        console.log("Sending message...");
        axios.post('http://localhost:5000/contacts', {
            type: "dm",
            user1Id: googleID,
            user2Id: this.props.profile[0].googleId
        }).catch(err => {
            console.error(err);
        }).then(response => {
            console.log(response);
            this.setState({chatID: response})
        })
        console.log(this.state.chatID);

        this.props.history.push('/chat/' + this.state.chatID);
    }

    // async getUserData() {
    //     this.state.results.forEach(matchRes => {
    //         var googleID = matchRes.googleID;
    //         axios.get(`http://localhost:5000/users/byGoogleID/${googleID}/`)
    //           .then(profileRes => {
    //               matchRes.push({
    //                   name: profileRes.name,
    //                   email: profileRes.email
    //               })
    //           })
              
    //         //axios to get the the user obj from db using googleID
    //         //add the name and email to the res obj
    //         //add res to the results array
    //       })
    //       this.setState({isLoading: false});
    //       console.log("DONEE");
    // }

    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={styles.headerText}><strong>Results</strong></h1>
                        
                        <Button variant="primary" onClick={this.goToBuddyFinder}>Return to Buddy Finder main page</Button>
                    </div>
                    <CardDeck>
                    {this.state.noResults ? (
                        <h1 style={{padding: "3rem"}}>No match found! ): </h1>
                    ) : (
                        <Card>

                        {this.state.results.map((result) => {
                            return <BuddyResult
                            key={result.key}
                            id={result.key}
                            name={result.name}
                            gender={result.gender}
                            email={result.email}
                            googleID={result.googleID}
                            educationLevel={result.educationLevel}
                            year={result.year}
                            sendMessage={this.sendMessage}/>;
                        })}
                        
                        </Card>
                    )}

                    </CardDeck>
                </div>
            </div>
        )
    }

}


// <Card>
// {/* !this.state.isLoading &&  */}
// {!this.state.noResults && this.state.results.map((result) => {
//     return <BuddyResult
//     key={result.key}
//     id={result.key}
//     name={result.name}
//     gender={result.gender}
//     email={result.email}
//     googleID={result.googleID}
//     educationLevel={result.educationLevel}
//     year={result.year}
//     sendMessage={this.sendMessage}/>;
// })}

// </Card>
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
        margin: "2rem",
        fontSize: 60, 
        fontWeight: 500
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (BuddyFinderResult);
