const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    "path": "home",
    "name": "legend",
  });
});

app.use("/.netlify/functions/api", router);
module.exports.handlers = serverless(app);