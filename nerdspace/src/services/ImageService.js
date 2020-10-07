import axios from 'axios';

export async function deleteImages(images, callback =(err)=>{console.error(err)}) {
  if (images.length > 0) {
    for (var i in images) {
      //this is problematic
      var arr = images[i].split("/");
      var size = arr.length;
      var last = arr[size - 1];
      var arr2 = last.split(".");
      var public_id = arr2[0];
      try {
        var res = await axios.delete(`http://localhost:5000/images/byUrl/${public_id}`);
        var imageObjArr = await res.data.data;
        await axios.post(`http://localhost:5000/images/delete`, {
          images: imageObjArr
        });
        return res.data;
      } catch (error) {
        callback(error);
      }
    }
  }
}

export async function getImage(url, callback=(err)=>{console.error(err)}) {
  var arr = url.split("/");
  var size = arr.length;
  var last = arr[size - 1];
  var arr2 = last.split(".");
  var public_id = arr2[0];
  try {
    var res = await axios.get(`http://localhost:5000/images/byUrl/${public_id}`);
    return await res.data;
  } catch (error) {
    callback(error);
  }
}

export async function uploadImage(formData, callback = (err)=>{console.error(err)}) {
  try {
    const res = await axios.post("http://localhost:5000/images/upload", formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
    })
    return await res.data;
  } catch(error) {
    callback(error)
  }
}
