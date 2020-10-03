import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Contacts from './Contacts';
import "./Chat.css";


const db = require('../firebase').db;

class ContactsSection extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
        }
    }

    async componentDidMount() {
        try {
            db.ref('contacts').on("value", snapshot => {
                let contacts = [];
                snapshot.forEach(contact => {
                    contacts.push(contact);
                });
                this.setState({ contacts });
            });
        } catch (error) {
            console.log("Read error");
        }
    }

    render() {
        return (
            <div>
                <ul className="contacts">
                    {this.state.contacts.map((contact) => {
                        let ctct = contact.val();
                        return <Contacts
                            key={contact.key}
                            id={contact.key}
                            title={ctct.name}
                            type={ctct.type}/>;
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
