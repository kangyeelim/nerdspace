import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ProfileBox from '../components/ProfileBox';
import GroupBox from '../components/GroupBox';
import Postbar from '../components/Postbar';
import './Home.css';

class UserHome extends React.Component {
  render() {
    return (
      <div className='container'>
        <Row>
          <Col md={6}>
            <ProfileBox />
            <GroupBox />
          </Col>
          <Col>
            <Postbar />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (UserHome);
