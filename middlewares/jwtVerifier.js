const jwtVerifier = require("../security/jwt");
const logger = require("pino")();
function verifyJWT_MW(req, res, next) {
  let token = req.headers.authorization;
  let temp = null;
  if (token.includes("Bearer")) {
    temp = token.split(" ");
  }
  logger.info("jwt---------", temp ? temp : token);
  jwtVerifier
    .verifyJWT(temp ? temp[1] : token)
    .then((decodedToken) => {
      logger.info("jwt verified");
      req.user = decodedToken.result;
      next();
    })
    .catch((err) => {
      logger.info("jwt not verified");
      logger.info(err);
      res
        .status(401)
        .json({ error: true, message: "Token is Invalid or is missing" });
    });
}

module.exports = {
  verifyJWT_MW,
};
