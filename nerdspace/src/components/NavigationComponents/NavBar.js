import {
  AppBar,
  Container,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Fab,
} from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
import * as React from "react";
import SideDrawer from "./SideDrawer";
import BackToTop from "./BackToTop.js";
import { connect } from 'react-redux';
import { deleteProfile, deleteToken } from '../../redux/actions';
import logoIcon from "../../assets/logoicon.png";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#bbe1fa",
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  navListDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#0e1e40",
  },
  logoIcon: {
    maxWidth: 60,
  },
});

const navLinks = [
  { title: "Home", path: "/home" },
  { title: "Find Buddy", path: "/buddy-finder" },
  { title: "Community", path: "/community" },
  { title: "Message", path: "/chat" },
  { title: "Profile", path: "/account" },
  { title: "Logout", path: "/logout" },
];

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar component="nav">
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <img src={logoIcon} alt="logo" className={classes.logoIcon} />
            <Hidden smDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navListDisplayFlex}
              >
                {navLinks.map(({ title, path }) => (
                  <a href={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </a>
                ))}
              </List>
            </Hidden>
            <Hidden mdUp>
              <SideDrawer navLinks={navLinks} />
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <BackToTop>
          <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.token,
  };
};

export default connect(mapStateToProps, {
  deleteProfile: deleteProfile,
  deleteToken: deleteToken,
})(Header);
