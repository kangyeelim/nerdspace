import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import TitleCard from '../../components/StudyRoomComponents/TitleCard';
import RoomSideBar from '../../components/StudyRoomComponents/RoomSideBar';
import RoomPostsSection from '../../components/StudyRoomComponents/RoomPostsSection';
import axios from 'axios';
import { deleteImages } from '../../services/ImageService';
import { goToCreateRoomForm } from '../../navigators/StudyRoomNavigator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isRoomAccessibleToUser, isTokenAccepted } from '../../services/Auth';
import { getRoomDetails } from '../../services/StudyRoomService';
import NavBar from "../../components/NavigationComponents/NavBar";

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
      this.state.roomID) && await isTokenAccepted(this.props.token);
    this.setState({isAuthenticated:await isAuthenticated});
    var res = await getRoomDetails(this.state.roomID);
    this.setState({roomName: (await res).data.name, imageUrl: (await res).data.imageUrl});
    this.setState({isAuthenticating:false});
  }

  async leaveRoom(id) {
    //remove googleID from room
      console.log("Leaving room");
    axios.delete(`http://localhost:5000/studyrooms/removeMember/${id}/${this.props.profile[0].googleId}`)
      .then(async res => {
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
            console.log("Here");

            axios.delete(`http://localhost:5000/contacts/${id}/${this.props.profile[0].googleId}`)
            .catch(err => {
                console.error(err);
            })
          //delete the images from firebase and cloudinary
          var imageArr = [];
          imageArr.push(this.state.imageUrl);
          await deleteImages(imageArr);
        }
      })
      .catch(err => {
        console.error(err);
      })
      console.log("2");

    //remove roomID from user
    axios.delete(`http://localhost:5000/users/removeRoom/${id}/${this.props.profile[0].googleId}`)
      .then(res => {
        this.props.history.push('/community');
      })
      .catch(err => {
        console.error(err);
      })

      axios.delete(`http://localhost:5000/contacts/${id}/${this.props.profile[0].googleId}`)
        .catch(err => {
            console.error(err);
        })
  }

  editRoom(id, name, image) {
    goToCreateRoomForm(this.props.history, id, name, image);
  }

  render() {
    if (this.state.isAuthenticating) {
      return <div className="container" style={{margin:"auto"}}>
        <CircularProgress/>
      </div>
    }
    if (!this.state.isAuthenticated) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
          <div className='container' style={styles.container}>
            <Col>
            <Row>
            <TitleCard
              imageUrl={this.state.imageUrl}
              roomName={this.state.roomName}
              id={this.state.roomID}
              leaveRoom={this.leaveRoom}
              editRoom={this.editRoom}
            />
            </Row>
            <Row>
              <Col xs={9}>
                <RoomPostsSection
                  imageUrl={this.state.imageUrl}
                  roomName={this.state.roomName}
                  id={this.state.roomID}
                  history={this.props.history}
                />
              </Col>
              <Col xs={3}>
                <RoomSideBar
                  imageUrl={this.state.imageUrl}
                  roomName={this.state.roomName}
                  id={this.state.roomID}
                  history={this.props.history}
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
  container: {
    margin: "auto"
  },
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (StudyRoom);
