import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import RoomBox from '../components/RoomBox';
import TitleCard from '../components/TitleCard';
import RoomSideBar from '../components/RoomSideBar';
import RoomPostsSection from '../components/RoomPostsSection';

class StudyRoom extends React.Component {

  constructor() {
    super();
    this.state={
      viewAllPosts: false,
      searchKeyWord: null
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.search = this.search.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  handleSearchInput(e) {
    this.setState({searchKeyWord:e.currentTarget.value});
  }

  search() {

  }

  createPost() {

  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
            <TitleCard
              imageUrl={this.props.location.state.imageUrl}
              roomName={this.props.location.state.roomName}/>
              <div style={{display: "flex", width: "80vw", marginTop: "30px"}}>
                <FormControl onChange={this.handleSearchInput} type="text" placeholder="Search for posts" className="mr-sm-2" style={{maxWidth: "65vw"}}/>
                <Button  variant="outline-primary"onClick={this.search} style={{marginRight: "20px"}}>Search</Button>
                <Button variant="primary" onClick={this.createPost} style={{marginLeft: "auto"}}>Create post</Button>
              </div>
                <Row>
                  <Col md="auto">
                    <RoomPostsSection/>
                  </Col>
                  <Col xs={1}>
                    <RoomSideBar />
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
