import axios from 'axios';

export function deleteImages(images, callback1 = (res)=>{},
  callback2 = (res)=>{},
  callback3=(err)=>{console.error(err)},
  callback4=(err)=>{console.error(err)}) {
  if (images.length > 0) {
    for (var i in images) {
      //this is problematic
      var arr = images[i].split("/");
      var size = arr.length;
      var last = arr[size - 1];
      var arr2 = last.split(".");
      var public_id = arr2[0];
      axios.delete(`http://localhost:5000/images/byUrl/${public_id}`)
        .then(res => {
          var imageObjArr = res.data.data;
          axios.post(`http://localhost:5000/images/delete`, {
            images: imageObjArr
          })
          .then(res => {
            callback2(res);
          })
          .catch(err => {
            callback4(err);
          })
        })
        .then(res => {
          callback1(res);
        })
        .catch(err => {
          callback3(err);
        })
    }
  }
}
