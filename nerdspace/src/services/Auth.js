import axios from 'axios';

export async function isRoomAccessibleToUser(googleID, roomID) {
  var res = await axios.get(`http://localhost:5000/studyrooms/byRoomID/${roomID}`);
  var members = Object.values(await res.data.data.members);
  var res2 = await axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`);
  var user = (await res2).data.data[0];
  var rooms = Object.values(user.rooms);
  return members.includes(googleID) && rooms.includes(roomID);
}
