import axios from 'axios';
import { ROOM_API_URL } from './Urls';

export async function getRoomDetails(id, callback=(err)=>{console.error(err);}) {
  try {
    var res = axios.get(ROOM_API_URL + `/byRoomID/${id}`);
    return (await res).data;

  } catch (error) {
    callback(error);
  }
}

export async function updateRoomDetails(id, name, imageUrl, isThereImage,
  callback = err=>{console.error(err);}) {
  try {
    var res = await axios.post(ROOM_API_URL + `/updateInfo`, {
      key: id,
      name: name,
      imageUrl: imageUrl,
      isThereImage: isThereImage
    })
    return (await res).data;
  } catch (error) {
    callback(error);
  }
}
