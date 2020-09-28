import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';

export default function Contacts(props) {
    return (
        <Card text="white" border="light" style={styles.card}>
            text="white" border="light" style={styles.card}
            <i class="fas fa-paper-plane"></i>
            <Card.Body>
                {props.isThereimage && <Image variant="top" src={props.imageUrl} style={styles.image} />}
                <Card.Title>{props.title}</Card.Title>
                {props.content}
                <Row style={{ marginLeft: 10, marginRight: 10, alignSelf: 'right' }}>
                    <Col>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
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
