import React from 'react';
import Form from 'react-bootstrap/Form';
import { Col } from "react-bootstrap";

class Postbar extends React.Component {
    render() {
        return (
            <Form.Group style={styles.bar} className="mt-3 mb-3 ml-5 mr-5 pl-1 pr-1 pt-5 pb-5">
                <Form.Row>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="&#xf27a; Start a post..."/>
                    </Col>
                </Form.Row>
            </Form.Group>
        )
    }
}

const styles = {
    bar: {
        minWidth: "40vw",
    }
}
export default Postbar;