import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { uploadImage, deleteImages } from '../../services/ImageService';

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
    var imageData = await uploadImage(data,
      (err)=>{this.setState({isUploading: false})});

    if (imageData) {
        this.setState({images: this.state.images.concat(await imageData)});
        this.props.handleImages(this.state.images);

    }
    this.setState({isUploading:false});
  }

  async handleRemove(imageData) {
    var arr = [];
    arr.push(imageData.secure_url);
    var res = await deleteImages(arr);

    var updatedState = this.state.images.filter(image => image !== imageData);
    this.setState({images:updatedState});
    this.props.handleImages(this.state.images);
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
