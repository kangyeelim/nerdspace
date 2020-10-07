import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Redirect } from 'react-router-dom';
import { Col, Row, Form, Button, Image, Card, FormControl, Container } from 'react-bootstrap';
import RoomBox from '../../components/StudyRoomComponents/RoomBox';
import TitleCard from '../../components/StudyRoomComponents/TitleCard';
import RoomSideBar from '../../components/StudyRoomComponents/RoomSideBar';
import RoomPostsSection from '../../components/StudyRoomComponents/RoomPostsSection';
import axios from 'axios';
import { deleteImages } from '../../services/ImageService';
import { goToCreateRoomForm } from '../../navigators/StudyRoomNavigator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isRoomAccessibleToUser } from '../../services/Auth';
import { getRoomDetails } from '../../services/StudyRoomService';

class StudyRoom extends React.Component {
  constructor(props) {
    super(props);
    const roomID = props.match.params.id;
    this.state = {
      isAuthenticating: true,
      isAuthenticated: false,
      roomID: roomID,
      roomName: null,
      imageUrl: null
    }
    this.leaveRoom = this.leaveRoom.bind(this);
    this.editRoom = this.editRoom.bind(this);
  }

  async componentDidMount() {
    var isAuthenticated = await isRoomAccessibleToUser(this.props.profile[0].googleId,
      this.state.roomID);
    this.setState({isAuthenticated:await isAuthenticated});
    var res = await getRoomDetails(this.state.roomID);
    this.setState({roomName: (await res).data.name, imageUrl: (await res).data.imageUrl});
    this.setState({isAuthenticating:false});
  }

  leaveRoom(id) {
    //remove googleID from room
    axios.delete(`http://localhost:5000/studyrooms/removeMember/${id}/${this.props.profile[0].googleId}`)
      .then(res => {
        if (res.data.data === 1) {
          //delete study room posts
          axios.delete(`http://localhost:5000/studyroomposts/byRoomID/${id}`)
            .then(res => {
              //have to remove images from the posts
              //delete study room
              var postArr = res.data.data;
              for (var i in postArr) {
                deleteImages(Object.values(postArr[i].images));
              }
            })
            .catch(err => {
              console.error(err);
            })

          axios.delete(`http://localhost:5000/studyrooms/${id}`)
            .catch(err => {
              console.error(err);
            })
          //delete the images from firebase and cloudinary
          var arr = this.props.location.state.imageUrl.split("/");
          var size = arr.length;
          var last = arr[size - 1];
          var arr2 = last.split(".");
          var public_id = arr2[0];
          axios.delete(`http://localhost:5000/images/byUrl/${public_id}`)
            .then(res => {
              var images = res.data.data;
              axios.post('http://localhost:5000/images/delete', {
                images: images
              })
              .catch(err => {
                console.error(err);
              })
            })
            .catch(err => {
              console.error(err);
            })
        }
      })
      .catch(err => {
        console.error(err);
      })
    //remove roomID from user
    axios.delete(`http://localhost:5000/users/removeRoom/${id}/${this.props.profile[0].googleId}`)
      .then(res => {
        this.props.history.push('/community');
      })
      .catch(err => {
        console.error(err);
      })
  }

  editRoom(id, name, image) {
    goToCreateRoomForm(this.props.history, id, name, image);
  }

  render() {
    if (this.state.isAuthenticating) {
      return <Container>
        <CircularProgress/>
      </Container>
    }
    if (!this.state.isAuthenticated) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
            <TitleCard
              imageUrl={this.state.imageUrl}
              roomName={this.state.roomName}
              id={this.state.roomID}
              leaveRoom={this.leaveRoom}
              editRoom={this.editRoom}
            />
            <Row>
              <Col md={11}>
                <RoomPostsSection
                  imageUrl={this.state.imageUrl}
                  roomName={this.state.roomName}
                  id={this.state.roomID}
                  history={this.props.history}
                />
              </Col>
              <Col xs={1}>
                <RoomSideBar
                  imageUrl={this.state.imageUrl}
                  roomName={this.state.roomName}
                  id={this.state.roomID}
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
