const express = require("express");
const router = express.Router();
const Axios = require("axios");
var AWS = require("aws-sdk");
var btoa = require("btoa");
const { v1: uuidv1 } = require("uuid");
AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
});

const S3 = new AWS.S3();
const {
  uploadFile,
  getFile,
  deleteFile,
} = require("../controllers/FileUploadController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/upload
@desc - route for add new file
@access - PRIVATE */
router.post("/upload", verifyJWT_MW, uploadFile);

// router.get(
//   "/getFile",
//   asyncMiddleware(async (req, res, next) => {
//     uploadService
//       .get(req)
//       .then(async (response) => {
//         const url = response.url;
//         const axiosObj = await Axios({
//           url,
//           method: "GET",
//           responseType: "stream",
//         });
//         axiosObj.data.pipe(res);
//       })
//       .catch((err) => {
//         // console.log("/upload/getFile -> catch of get File", err)
//         return res
//           .status(err.status || 500)
//           .send({ error: err.error, result: err.result, message: err.message });
//       });
//   })
// );

/**
@type - DELETE
@route -  /api/deleteFile
@desc - route for delete file
@access - PRIVATE */
router.delete("/deleteFile", verifyJWT_MW, deleteFile);

/**
@type - DELETE
@route -  /api/getFile
@desc - route for get file
@access - PRIVATE */
router.get("/getFile", verifyJWT_MW, getFile);

module.exports = router;
