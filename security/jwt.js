var jwt = require("jsonwebtoken");
var SellerModel = require("../models/SellerModel");
const logger = require("pino")();

exports.verifyJWT = function (token) {
  return new Promise(function (resolve, reject) {
logger.info(token)
    if (token) {
      jwt.verify(token, process.env.jwtPrivateKey, async function (err, decoded) {
        if (err) {
          logger.info(err);
          reject({
            error: true,
            message: err.message + "err??"

          });

        } else if (!decoded) {
          logger.info("Wrong token");
          reject({
            error: true,
            message: "Wrong token"
          });
        } else if (decoded) {
            SellerModel.findOne({ _id: decoded.id }).then(user => {

                resolve({ error: false, result: user });
              }).catch(err => {
  
                reject({ error: true, message: "Wrong Token" });
              });
        }
      });
    } else {
      reject({ error: true, message: "Authentication error. Token required." });
    }
  });
};