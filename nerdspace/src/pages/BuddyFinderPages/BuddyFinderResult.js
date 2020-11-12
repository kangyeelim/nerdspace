import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import { Button, Card, Container } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import BuddyResult from '../../components/BuddyFinderComponents/BuddyResult';
import { createBrowserHistory } from 'history';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../../components/NavigationComponents/NavBar";

export const history = createBrowserHistory({ forceRefresh: true });

class BuddyFinderResult extends React.Component {

    constructor() {
        super();
        this.state = {
            results: [],
            chatID: "",
            noResults: false,
            isAuthenticating: true,
            isLoggedIn: false
            // isLoading: true
          }
        this.goToBuddyFinder = this.goToBuddyFinder.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    async componentDidMount() {
      if (await isTokenAccepted(this.props.token)) {
        this.getSearchResults();
        this.setState({isLoggedIn: true, isAuthenticating:false});
      } else {
        this.setState({isLoggedIn: false, isAuthenticating:false});
      }
    }

    async getSearchResults() {
        await axios.get(`http://localhost:5000/profiles/getBuddy/${this.props.profile[0].googleId}/${this.props.location.state.gender}/${this.props.location.state.educationLevel}/${this.props.location.state.yearOfStudy}/${this.props.location.state.interest}`)
        .then(res => {
            if (res.length !== 0) {
                this.setState({results: res.data.data});
                this.setState({noResults: false});
            } else {
                this.setState({noResults: true});
            }

        }).catch(err => {
            console.error(err);
        })

        if (this.state.results.length === 0) {
            this.setState({noResults: true});
        }
    }

    goToBuddyFinder() {
        history.push('/buddy-finder');
    }

    async sendMessage(googleID) {
        axios.post('http://localhost:5000/contacts', {
            type: "dm",
            user1Id: googleID,
            user2Id: this.props.profile[0].googleId
        }).catch(err => {
            console.error(err);
        }).then(response => {
            this.props.history.push('/chat/' + response.data.chatID);
        })
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
                <NavBar history={this.props.history}/>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h2 style={{marginBottom: "20px"}}>Results</h2>
                        <Button variant="primary" onClick={this.goToBuddyFinder}>Return to Buddy Finder Page</Button>
                    </div>
                    <CardDeck style={{ display: "flex", flexDirection: "column", minWidth: "70vw" }}>
                    {this.state.noResults ? (
                        <h1 style={{padding: "3rem"}}>No match found! ): </h1>
                    ) : (

                      <div>
                        {this.state.results.map((result) => {
                            return <BuddyResult
                            key={result.key}
                            id={result.key}
                            imageUrl={result.imageUrl}
                            name={result.name}
                            gender={result.gender}
                            email={result.email}
                            googleID={result.googleID}
                            educationLevel={result.educationLevel}
                            year={result.year}
                            sendMessage={this.sendMessage}/>;
                        })}
                        </div>
                    )}

                    </CardDeck>
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        // height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // margin: "3rem 3rem",
        // padding: "3rem",
        textAlign: "center",
        justifyContent: "center",
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "2rem",
    },
    headerText: {
        margin: "0.5rem",
        fontSize: 40,
        fontWeight: 350
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {}) (BuddyFinderResult);
