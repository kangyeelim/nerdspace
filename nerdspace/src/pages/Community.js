import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CommunitySideBar from '../components/CommunitySideBar';
import CommunityContent from '../components/CommunityContent';

class Community extends React.Component {
  render() {
    return (
      <div className="container-fluid">
          <NavBar history={this.props.history}/>
          <div className="container">
            <div>
                <CommunitySideBar />
                <CommunityContent />
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (Community);
