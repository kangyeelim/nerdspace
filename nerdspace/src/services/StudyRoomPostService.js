import axios from 'axios';
import { deleteImages } from './ImageService';

export function deleteStudyRoomPost(postId, images, callback1 = (res)=> {},
callback2 = (err)=>{console.error(err)},
callback3 = (res)=>{},
callback4 = (res) => {},
callback5 = (err) => {console.error(err)},
callback6 = (err) => {console.error(err)}) {
  axios.delete(`http://localhost:5000/studyroomposts/${postId}`)
    .then(res => {
      callback1(res);
    })
    .catch(err => {
      callback2(err);
    })
    deleteImages(images, callback3, callback4, callback5, callback6);
}

export function findPostsByString(word, callback1 = (res)=>{}, callback2 = (err)=>{}) {
  axios.get(`http://localhost:5000/studyroomposts/byKeyword/${this.props.id}/${this.state.searchKeyWord}`)
    .then((res) => {
      callback1(res);
    })
    .catch(err => {
      callback2();
    })
}
