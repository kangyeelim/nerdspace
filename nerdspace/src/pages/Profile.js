import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row } from 'react-bootstrap';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePic : this.props.profile[0].imageUrl,
            data: [
                {
                    name: this.props.profile[0].name,
                    bio: ''
                },
            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onSubmit = event => {
        event.preventDefault();
        const name = this.name.value;
        const bio = this.bio.value;
        const info = {name: name, bio: bio};
        const data = [...this.state.data, info];
        this.setState({
            data: data,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        alert('Your username is: ' + this.input.value + this.bio.value);
    };

    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                <div className="container">
                <Col>
                    <Row style={styles.image}>
                    <img className="thumbnail-image"
                        src={this.state.profilePic}
                    />
                    </Row>
                    <Row>
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="input-group" style={styles.bar}>
                            <label style={styles.nameLabel} htmlFor="name">Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                ref={input => this.name = input}/>
                        </div>
                        <div className="input-group" style={styles.bar}>
                            <label style={styles.bioLabel} htmlFor="bio">Bio: </label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Describe yourself (e.g. interests, subjects)"
                                ref={input => this.bio = input}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                    </Row>
                    </Col>
                </div>
                <hr/>
                <Col>
                    {
                        this.state.data.map((info, index) => <Card key={index} info={info}/>)
                    }
                </Col>
            </div>
        )
    }
}

const Card = props =>
    <div className="col-md-6 col-lg-3">
        <div className="card mb-3">
            <div className="card-body">
                <p className="card-title"><span>Name: </span>{props.info.name}</p>
                <p className="card-text">
                    <span>Bio: </span>{props.info.bio}
                </p>
            </div>
        </div>
    </div>;

const styles = {
    bar: {
        width: '70vw',
        margin: '40px',
        justifyContent:'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    nameLabel: {
        marginRight: '10px',
        fontWeight: 'bold',
    },
    bioLabel: {
        marginRight: '30px',
        fontWeight: 'bold',
    },
    image: {
        justifyContent:'center',
        alignSelf: 'center',
    },
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (Profile);