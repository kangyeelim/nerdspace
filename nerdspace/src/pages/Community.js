import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, FormControl } from 'react-bootstrap';
import RoomBox from '../components/RoomBox';

const stub = ["GP resources sharing group", "AMaths sucks", "Physics group", "Chemistry Fun"];

class Community extends React.Component {

  constructor() {
    super();
    this.enterRoom = this.enterRoom.bind(this);
  }

  enterRoom() {
    console.log("enter");
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
          <Form className="ml-auto">
            <div style={styles.form}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" style={styles.searchbar}/>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
          { stub && stub.map((room) => {
            return (
                <RoomBox roomName={room} enter={this.enterRoom}/>
            );
          })}
          </Col>
        </div>
      </div>
    );
  }
}

const styles = {
  form: {
    display: "flex",
    width: '80vw',
    justifyContent: "center"
  },
  searchbar: {

  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (Community);
