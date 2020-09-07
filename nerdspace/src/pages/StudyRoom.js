import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, Image } from 'react-bootstrap';
import RoomBox from '../components/RoomBox';
import TitleCard from '../components/TitleCard';

class StudyRoom extends React.Component {

  constructor() {
    super();
    this.state={
    }
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
            <TitleCard imageUrl={this.props.location.state.imageUrl}
             roomName={this.props.location.state.roomName}/>
            <Row>
              <Col>
                POSTS
              </Col>
              <Col>
                Sidebar
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
