import React from "react";
import { Card } from 'react-bootstrap';
import { ListItem } from '@material-ui/core';
import { MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';
import './GroupBox.css';

class GroupBox extends React.Component {

    render() {
        return (
            <Card text="black" border="light" style={styles.card}>
                <Card.Body>
                    <Card.Title>Study Groups</Card.Title>
                <Card.Text style={styles.text}>
                    {this.props.rooms.map(room => {
                        return (<ListItem
                            key={room.key}
                            onClick={()=> this.props.enterRoom(room.key, room.name, room.imageUrl)}
                            >{room.name}
                        </ListItem>);
                    })}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const styles = {
    card: {
        width: "18rem",
        borderRadius: "5%",
        backgroundColor: "#a2d5f2",
        color: "#0f4c75"
    },
    text: {
        color: "#0f4c75",
        textDecorationLine: 'underline'
    }
}

export default GroupBox;
