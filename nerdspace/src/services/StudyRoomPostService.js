import axios from 'axios';
import { deleteImages } from './ImageService';

export async function deleteStudyRoomPost(postId, images,
  callback1 = (err)=> {console.error(err)},
  callback2= (err) =>{console.error(err)}) {
  try {
    await deleteImages(images, callback2);
    var res = await axios.delete(`http://localhost:5000/studyroomposts/${postId}`)
    return await res.data;
  } catch(error) {
    callback1(error);
  }
}

export async function findPostsByString(roomId, word, callback1 = (err)=>{console.error(err)}) {
  try {
    var res = await axios.get(`http://localhost:5000/studyroomposts/byKeyword/${roomId}/${word}`)
    return await res.data;
  } catch(error) {
    callback1(error);
  }
}

export async function getAllRoomPosts(roomId, callback = (err)=>{console.error(err)}) {
  try {
    var res = await axios.get(`http://localhost:5000/studyroomposts/getByRoom/${roomId}`);
    return res.data;
  } catch (error) {
    callback(error);
  }
}
