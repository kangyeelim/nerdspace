import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Redirect } from 'react-router-dom';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import RoomBox from '../../components/StudyRoomComponents/RoomBox';
import TitleCard from '../../components/StudyRoomComponents/TitleCard';
import RoomSideBar from '../../components/StudyRoomComponents/RoomSideBar';
import RoomPostsSection from '../../components/StudyRoomComponents/RoomPostsSection';
import axios from 'axios';

class StudyRoom extends React.Component {
  constructor() {
    super();
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  leaveRoom(id) {
    axios.delete(`http://localhost:5000/studyrooms/removeMember/${id}/${this.props.profile[0].googleId}`)
      .catch(err => {
        console.error(err);
      })
    axios.delete(`http://localhost:5000/users/removeRoom/${id}/${this.props.profile[0].googleId}`)
      .catch(err => {
        console.error(err);
      })
      this.props.history.push('/community');
    }

  render() {
    if (!this.props.location.state.roomName ||
        !this.props.location.state.id ||
        !this.props.location.state.imageUrl) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
            <TitleCard
              imageUrl={this.props.location.state.imageUrl}
              roomName={this.props.location.state.roomName}
              id={this.props.location.state.id}
              leaveRoom={this.leaveRoom}
            />
            <Row>
              <Col md={11}>
                <RoomPostsSection
                  imageUrl={this.props.location.state.imageUrl}
                  roomName={this.props.location.state.roomName}
                  id={this.props.location.state.id}
                  history={this.props.history}
                />
              </Col>
              <Col xs={1}>
                <RoomSideBar
                  imageUrl={this.props.location.state.imageUrl}
                  roomName={this.props.location.state.roomName}
                  id={this.props.location.state.id}
                />
              </Col>
            </Row>
          </Col>
        </div>
      </div>
    );
  }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (StudyRoom);
