import React from "react";
import axios from 'axios';

import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Contacts from './Contacts';
import "./Chat.css";


const db = require('../services/firebase').db;

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
            this.setState({ contacts: response.data.contacts });
        });
    }

    render() {
        return (
            <div>
                <ul className="contacts">
                    {this.state.contacts.map((contact) => {
                        return <Contacts
                            key={contact.id}
                            id={contact.id}
                            title={contact.name}/>;
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ContactsSection);
