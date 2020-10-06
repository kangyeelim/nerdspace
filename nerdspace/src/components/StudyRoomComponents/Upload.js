import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      images:[],
      isUploading: false,
    }
    this.uploadImage = this.uploadImage.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (this.props.images) {
      this.setState({images:this.props.images});
      console.log(this.props.images);
    }
  }

  async uploadImage(e) {
    this.setState({isUploading: true});
    const selectedFile = e.target.files[0];
    const data = new FormData();
    data.append('file', selectedFile);
    try {
      const response = await axios.post("http://localhost:5000/images/upload", data, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
      })
      const imageData = await response.data;
      this.setState({images: this.state.images.concat(imageData)});
      this.props.handleImages(this.state.images);
      this.setState({isUploading: false});
    } catch(error) {
      this.setState({isUploading: false});
      console.error(error);
    }
  }

  handleRemove(imageData) {
    var arr = [];
    arr.push(imageData);
    axios.post('http://localhost:5000/images/delete', {
      images: arr
    })
      .then(res => {
        var updatedState = this.state.images.filter(image => image !== imageData);
        this.setState({images:updatedState});
        this.props.handleImages(this.state.images);
        console.log("Removed image");
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input type="file" name="file" onChange={this.uploadImage} accept=".jpg, .jpeg, .png" />
          </div>
          <div>
          { this.state.isUploading && <CircularProgress />}
          </div>
          <div>
            { this.state.images.map(imageData => {
                return (
                  <div
                  style={{justifyContent:'center', alignItems:'center', flex:1}}
                  key={imageData.asset_id}>
                    <img className="d-block w-100"
                    src={imageData.secure_url}
                    alt="Image"
                    style={this.props.style}/>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.handleRemove(imageData)}/>
                  </div>
                );
              })
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
