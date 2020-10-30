import React from "react";
import { createBrowserHistory } from 'history';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./Chat.css";

const db = require('../../services/firebase').db;

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
            <Button variant="light" style={styles.button} onClick={this.routeChange}>
                {this.state.title}
            </Button>
        );
    }
}

const styles = {
    button: {
        width: '10rem',
        height: "auto",
        margin: "10px",
        backgroundColor: "#e1f2fb",
        color: "#3282b8"
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(Contacts);
