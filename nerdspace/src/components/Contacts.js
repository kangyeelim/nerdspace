import React from "react";
import { withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./Chat.css";

const db = require('../firebase').db;

export const history = createBrowserHistory({ forceRefresh: true });

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        let ID = props.id;
        let title = props.title;

        this.state = {
            id: ID,
            title: title,
        }
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        history.push('/chat/' + this.state.id);
    }

    render() {
        return (
            <Button className="button" onClick={this.routeChange}>
                {this.state.title}
            </Button>
        );
    }
} 

const styles = {
    card: {
        width: '18rem',
        height: "auto",
        borderRadius: "10%",
        backgroundColor: "#A9A9A9",
        marginLeft: 0
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(Contacts);
