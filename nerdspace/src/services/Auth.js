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

export async function isTokenAccepted(tokenProp) {
  if (tokenProp.length == 0) {
    return false;
  }
  if (typeof tokenProp[0].access_token == undefined) {
    return false;
  }
  var accessToken = tokenProp[0].access_token;

  try {
    var res = await axios.get(`http://localhost:5000/tokens/byAccessToken/${accessToken}`);
    if ((await res).data.message == 'GET success') {
      var expires_at = res.data.data[0].session_state.expires_at;
      if (Date.now() < expires_at) {
        return true;
      } else {
        console.log("expired token");
        await deleteTokenFromDB(tokenProp);
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export async function deleteTokenFromDB(tokenProp) {
  if (tokenProp.length == 0 || typeof tokenProp[0].access_token == undefined) {

  } else {
    var accessToken = tokenProp[0].access_token;
    var token_id = tokenProp[0].id_token;
    try {
      var res = await axios.delete(`http://localhost:5000/tokens/byAccessToken/${accessToken}`);
      var res = await axios.delete(`http://localhost:5000/tokens/byTokenId/${token_id}`);
    } catch {
      return false;
    }
  }
}
