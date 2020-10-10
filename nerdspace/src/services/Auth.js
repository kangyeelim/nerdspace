import axios from 'axios';
import { USER_API_URL, ROOM_API_URL } from './Urls';

export async function isRoomAccessibleToUser(googleID, roomID) {
  try {
    var res = await axios.get(ROOM_API_URL + `/byRoomID/${roomID}`);
    var members = Object.values(await res.data.data.members);
    var res2 = await axios.get(USER_API_URL + `/byGoogleID/${googleID}`);
    var user = (await res2).data.data[0];
    var rooms = Object.values(user.rooms);
    return members.includes(googleID) && rooms.includes(roomID);
  } catch (error) {
    return false;
  }
}

export async function isUserLoggedIn(googleID, name, email, imageUrl) {
  try {
    var res = await axios.get(USER_API_URL + `/byGoogleID/${googleID}`);
    if ((await res).data.message == 'GET success') {
      return res.data.data[0].name == name &&
      res.data.data[0].email == email &&
      res.data.data[0].imageUrl == imageUrl;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }

}
