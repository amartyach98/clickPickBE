require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

//Routes
const sellerRoute = require("./routes/seller");


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

//APIs
app.use("/api", sellerRoute);

//**Swagger configuration */
const swaggerDefinition = {
  info: {
    title: "ClickPicking",
    version: "1.0.0",
    description: "Server for ClickPicking",
  },
  host: process.env.host || "localhost:8000",
  basePath: "/",
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

//**Initializing swagger with configuration and routes */
const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

if (process.env.environment !== "prod") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

//port
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
  console.log("Server is listening on port (http://localhost:%d)", port);
  console.log("Swagger-ui is available on http://localhost:%d/api-docs", port);
});
