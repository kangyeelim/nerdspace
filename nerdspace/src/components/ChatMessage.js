import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';

export default function ChatMessage(props) {
    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
            <Card.Subtitle>{props.username}</Card.Subtitle>
            <Card.Body>
                <Card.Text>
                    {props.message}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted" style={{flexDirection: 'row'}}>{props.timestamp}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

const styles = {
    card: {
        width: "57vw",
        justifyContent: 'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginTop: "10px"
    }
}
