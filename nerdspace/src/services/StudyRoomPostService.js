import axios from 'axios';
import { deleteImages } from './ImageService';
import { POST_API_URL } from './Urls';

export async function deleteStudyRoomPost(postId, images,
  callback1 = (err)=> {console.error(err)},
  callback2= (err) =>{console.error(err)}) {
  try {
    await deleteImages(images, callback2);
    var res = await axios.delete(POST_API_URL + `/${postId}`)
    return (await res).data;
  } catch(error) {
    callback1(error);
  }
}

export async function findPostsByString(roomId, word, callback1 = (err)=>{console.error(err)}) {
  try {
    var res = await axios.get(POST_API_URL + `/byKeyword/${roomId}/${word}`)
    return (await res).data;
  } catch(error) {
    callback1(error);
  }
}

export async function getAllRoomPosts(roomId, callback = (err)=>{console.error(err)}) {
  try {
    var res = await axios.get(POST_API_URL + `/getByRoom/${roomId}`);
    return (await res).data;
  } catch (error) {
    callback(error);
  }
}

export async function createNewPost(title, content, images, roomId, googleId,
  callback = (err)=>{console.error(err)}) {
  try {
    var res = await axios.post(POST_API_URL, {
      title: title,
      content: content,
      isThereImage: images.length > 0,
      imageUrl: images,
      roomID: roomId,
      googleID: googleId
    })
    return (await res).data;
  } catch (error) {
    callback(error);
  }
}

export async function updateExistingPost(key, title, content,
  callback = (err)=> {console.error(err)}) {
  try {
    var res = await axios.post(POST_API_URL + `/update`, {
      key:key,
      title:title,
      content:content
    });
    return (await res).data;
  } catch(error) {
    callback(error)
  }

}
