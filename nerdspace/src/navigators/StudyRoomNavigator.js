export function enterRoom(history, id, url, name) {
  history.push({
    pathname:`/room/${id}`,
    state: {
      roomName: name,
      imageUrl: url,
      id: id
    }
  });
}

export function goToCreateRoomForm(history, id, name, image) {
  history.push({
    pathname:'/createStudyRoom',
    state: {
      id:id,
      roomName: name,
      imageUrl: image
    }
  })
}

export function goToCreatePostForm(history, id, url, name) {
  history.push({
    pathname: `/createPost/${id}`,
    state: {
      id: id,
      roomName: name,
      imageUrl: url
    }
  });
}

export function goToEditPostForm(history, postId, images, title,
  content, roomId, roomName, url) {
    history.push({
      pathname:`/createPost/${roomId}`,
      state: {
        key: postId,
        postImages: images,
        title: title,
        content: content,
        id: roomId,
        roomName: roomName,
        imageUrl: url
      }
    });
  }
