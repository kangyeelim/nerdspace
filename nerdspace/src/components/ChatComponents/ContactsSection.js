import React from "react";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Contacts from './Contacts';
import "./Chat.css";
import { Typography } from "@material-ui/core";


const db = require('../../services/firebase').db;

class ContactsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            user: props.profile[0].googleId,
        }
    }

    async componentDidMount() {
        axios.get('http://localhost:5000/contacts', {
            params: {
                id: this.state.user
            }
        }).catch(err => {
            console.error(err);
        }).then(response => {
            console.log("Response: " + response);
            this.setState({ contacts: response.data.contacts });
        });
    }

    render() {
        return (
            <Card border="light" style={styles.card}>
                <Card.Body>
                <Typography variant="h5">Contacts</Typography>
                <ul className="contacts">
                    {this.state.contacts.map((contact) => {
                        return <Contacts
                            key={contact.id}
                            id={contact.id}
                            title={contact.name}/>;
                    })}
                </ul>
                </Card.Body>
            </Card>
        );
    }
}

const styles = {
    card: {
        width: "15rem",
        borderRadius: "10px",
        backgroundColor: "#a2d5f2",
        color: "#0f4c75",
        height: "auto",
        marginBottom: "20px",
    },
    text: {
        color: "#0f4c75",
        textDecorationLine: 'underline'
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ContactsSection);
