import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, FormControl } from 'react-bootstrap';
import RoomBox from '../components/RoomBox';

const stub = [ {name:"GP resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900"},
{name:"A Maths resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900"},
{name:"Physics resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900"},
{name:"Chem resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900"}];

class Community extends React.Component {

  constructor() {
    super();
    this.enterRoom = this.enterRoom.bind(this);
  }

  enterRoom(room, url) {
    console.log("enter");
    this.props.history.push({
      pathname:'/room',
      state: {
        roomName: room,
        imageUrl: url
      }
    });
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
                <RoomBox roomName={room.name} enter={() => this.enterRoom(room.name, room.url)} imageUrl={room.url}/>
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
