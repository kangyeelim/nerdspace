import React from 'react';
import { Navbar, Nav, Image, NavDropdown, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteProfile } from '../redux/actions';

class NavBar extends React.Component {

  constructor() {
    super();
    this.state = {
      profilePic: null
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.goCommunity = this.goCommunity.bind(this);
    this.goMessaging = this.goMessaging.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goProfile = this.goProfile.bind(this);
    this.goSettings = this.goSettings.bind(this);
    this.goHelp = this.goHelp.bind(this);
  }

  componentDidMount() {
    this.setState({profilePic: this.props.profile[0].imageUrl});
  }

  handleLogout(){
    this.props.deleteProfile();
    this.props.history.push("/");
  }

  goCommunity() {
    this.props.history.push("/community");
  }

  goHome() {
    //this.props.history.push("/home");
  }

  goMessaging() {
    //this.props.history.push("/messaging");
  }

  goProfile() {
    //this.props.history.push("/account");
  }

  goSettings() {
    //this.props.history.push("/settings");
  }

  goHelp() {
    //this.props.history.push("/help");
  }

  render() {
    return (
        <Navbar expand="lg" className="shadow" style={{ backgroundColor: "#D3D3D3" }}>
          <Navbar.Brand href="#">
            Nerdspace
          </Navbar.Brand>
          <Navbar.Toggle style={styles.navlink} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={styles.navlink} id="basic-navbar-nav">
            <Nav style={styles.navlink} activeKey={this.props.activeKey} className="ml-auto">
              <Nav.Link eventKey={1} style={styles.navlink} onClick={this.goHome}>Home</Nav.Link>
              <Nav.Link eventKey={2} style={styles.navlink} onClick={this.goCommunity}>Community</Nav.Link>
              <Nav.Link eventKey={3} style={styles.navlink} onClick={this.goMessaging}>Messaging</Nav.Link>
              <NavDropdown className="nav-dropdown"
                id="nav-dropdown" style={styles.dropdown}
                title={
                        <div style={styles.dropdownContainer}>
                            <img className="thumbnail-image"
                                src={this.state.profilePic}
                                style={styles.thumbnail}
                            />
                            {this.props.profile[0].name}
                        </div>
                    }>
                <NavDropdown.Item onClick={this.goPrfile}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={this.goSettings}>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={this.goHelp}>Help</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

const styles = {
  logo: {
    width: 30,
    marginRight: 15,
    marginLeft: 30,
  },
  thumbnail: {
    width:30,
    marginLeft:-10,
    marginRight:10
  },
  dropdown: {
    marginRight: 55,
    width: 100,
    marginLeft:20,
  },
  dropdownContainer: {
    marginLeft: 20,
    marginBottom: -28,
  },
  navlink: {
    marginLeft: 20,
    fontSize: 16,
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {deleteProfile:deleteProfile}) (NavBar);
