import React from "react";
import { connect } from "react-redux";
import { deleteProfile, deleteToken } from "../redux/actions";
import { deleteTokenFromDB } from "../services/Auth";
import { Button, Link, Card, CardContent, Typography } from "@material-ui/core";

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
            <div style={styles.container}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Logout from Nerdspace</Typography>
                        <hr></hr>
                        <Link exact to="/login">
                            <Button
                                size="sm"
                                className="center"
                                color="primary"
                                onClick={this.handleLogout}
                            >
                                Logout
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const styles = {
    container: {
        marginTop: "30vh",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
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
