import React from "react";
import { connect } from "react-redux";
import { deleteProfile, deleteToken } from "../redux/actions";
import { deleteTokenFromDB } from "../services/Auth";
import { Row, Col, Container } from "react-bootstrap";
import { Button, Link, Card, CardContent } from "@material-ui/core";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.deleteToken();
    this.props.deleteProfile();
    deleteTokenFromDB(this.props.token);
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Card>
                <CardContent>
                  <hr></hr>
                  Logout from Nerdspace?
                  <Link exact to="/login">
                    <Button
                      size="sm"
                      className="float-right"
                      color="secondary"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.token,
  };
};

export default connect(mapStateToProps, {
  deleteProfile: deleteProfile,
  deleteToken: deleteToken,
})(Logout);
