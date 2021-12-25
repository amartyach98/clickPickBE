var multer = require("multer");
var multerS3 = require("multer-s3");
var AWS = require("aws-sdk");
var btoa = require("btoa");
const { v1: uuidv1 } = require("uuid");
const S3 = new AWS.S3();
const logger = require("pino")();

exports.uploadFile = async (req, res) => {
  const entity = req.user._id;
  let storage;
  storage = multerS3({
    s3: S3,
    bucket: process.env.BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fileName: file.originalname, mimetype: file.mimetype });
    },
    key: (req, file, cb) => {
      cb(null, entity + "/" + uuidv1());
    },
  });
  var upload = multer({
    storage: storage,
  }).any();

  try {
    upload(req, res, async (error) => {
      if (error) {
        return res.send({
          error: true,
          status: 500,
          err: error.message,
          message: "Message!!",
        });
      } else {
        logger.info(req.body);
        logger.info(req.files, req.file);
        // return s3 url here too for video?
        var updatedReqObject = req.files.map((x) => {
          let obj = x;
          obj.s3Url = process.env.GET_FILE_URL + x.key;
          return obj;
        });
        return res.send({
          error: false,
          status: 200,
          result: updatedReqObject,
          message: "file uploaded",
        });
      }
    });
  } catch (e) {
    logger.info(e, "L89>>>");
    return res.send({
      error: true,
      status: 400,
      message: "Server error " + e,
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: req.query.key 
    }

    const data = await S3.getObject(params).promise();

    // Check for image payload and formats appropriately
    if( data.ContentType === 'image/jpeg' ) {
      return data.Body.toString('base64');
    } else {
      return data.Body.toString('utf-8');
    }

  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
};

exports.deleteFile = async (req, res) => {
  S3.deleteObject(
    { Bucket: process.env.BUCKET, Key: req.query.key },
    (err, data) => {
      if (err) {
        logger.info(err);
        return res.send({
          error: true,
          status: 400,
          message: "Server error",
        });
      }

      return res.send({
        error: false,
        result: data,
        message: "File deleted Successfully",
      });
    }
  );
};
