import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import RoomBox from '../../components/StudyRoomComponents/RoomBox';
import TitleCard from '../../components/StudyRoomComponents/TitleCard';
import RoomSideBar from '../../components/StudyRoomComponents/RoomSideBar';
import RoomPostsSection from '../../components/StudyRoomComponents/RoomPostsSection';

class StudyRoom extends React.Component {

  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
            <TitleCard
              imageUrl={this.props.location.state.imageUrl}
              roomName={this.props.location.state.roomName}
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
