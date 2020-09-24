const express = require('express');
const cors = require('cors');

require('dotenv').config();

//creates express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
const studyRoomPostsRouter = require('./routes/studyRoomPosts');
const studyRoomsRouter = require('./routes/studyRooms');
const studyRoomRequestsRouter = require('./routes/studyRoomRequests');
const profilesRouter = require('./routes/profiles');

app.use('/users', usersRouter);
app.use('/studyroomposts', studyRoomPostsRouter);
app.use('/studyrooms', studyRoomsRouter);
app.use('/studyroomrequests', studyRoomRequestsRouter);
app.use('/profiles', profilesRouter);
//starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
