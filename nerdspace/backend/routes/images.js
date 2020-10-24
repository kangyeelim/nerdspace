const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const db = require('../firebase').db;

const unlinkAsync = promisify(fs.unlink)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024 * 2, // 1 MB (max file size)
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', upload.single('file'), async (req, res) => {
  const image = req.file;
  try {
    const response = await cloudinary.uploader.upload(image.path)
    db.ref('images').push().set(response, function(error) {
      if (error) {
        res.send(error);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
  await unlinkAsync(image.path)
})

router.post('/delete', (req, res) => {
  const values = req.body.images
  const promises = values.map(image => {
    cloudinary.uploader.destroy(image.public_id)
  })

  Promise
    .all(promises)
    .then(results => res.json(results));
})

router.route('/byUrl/:id').get((req, res) => {
  const id = req.params.id;
  db.ref('images').orderByChild('public_id')
  .equalTo(id)
  .once('value', function(snapshot) {
    var resArr = [];
    snapshot.forEach(function(child) {
      resArr.unshift(child.val());
    });
    res.send({
      data: resArr,
      message: 'GET success'
    })
  }, function(error) {
    res.send(error);
  });
});

router.route('/byUrl/:id').delete((req, res) => {
  const id = req.params.id;
  var ref = db.ref('images');
  var resArr = [];
  ref.orderByChild('public_id')
  .equalTo(id)
  .once('value', function(snapshot) {
    snapshot.forEach(function(child) {
      resArr.unshift(child.val());
      ref.child(child.key).remove();
    });
    res.send({
      data: resArr,
      message: 'GET success'
    })
  }, function(error) {
    res.send(error);
  });
});

module.exports = router;
