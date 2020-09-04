import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends React.Component {
    render() {
        return (
            <MDBFooter color="unique-color-dark" className="page-footer font-small pt-0" style={styles.footer}>
            <div style={{ backgroundColor: "#D3D3D3" }}>
                <MDBContainer fluid className="text-center text-md-left">
                <MDBRow className="py-4 d-flex align-items-center" style={styles.footerHeader}>
                    <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                    <h6 className="mb-0 white-text">
                        Get in touch with us!
                    </h6>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </div>
            <MDBContainer className="mt-4 mb-3 text-center">
                <MDBRow className="mt-3">
                <MDBCol md="auto" lg="4" xl="3" className="mb-4">
                    <h6 className="text-uppercase font-weight-bold">
                    <strong>Project Description</strong>
                    </h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                    <p>
                    This is a project designed to faciliate the process of finding a study buddy with common interests.
                    </p>
                </MDBCol>
                <MDBCol>
                </MDBCol>
                <MDBCol md="auto" lg="4" xl="3" className="mb-4">
                    <h6 className="text-uppercase font-weight-bold">
                    <strong>Contact Us</strong>
                    </h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                    <p>
                    <i className="fa fa-home mr-3" />National University of Singapore
                    </p>
                    <p>
                    <i className="fa fa-envelope mr-3" />info@example.com
                    </p>
                    <p>
                    <i className="fa fa-phone mr-3" />+ 01 234 567 88
                    </p>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> nerdspace.com </a>
                </MDBContainer>
            </div>
            </MDBFooter>
        );
    }
}

const styles = {
    footer: {
        position: "absolute",
        bottom: -300,
        width: "100%",
        height: "50px",   /* Height of the footer */
        background: "#6cf",

     }
}
export default Footer;
