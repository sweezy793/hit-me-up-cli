
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const app = express();

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:926b8660-260d-473c-b178-f1db68d1ca84",
    key: "d78b517c-fd0a-4259-8f08-d7da4b795a0d:kDBrcEi9XGgw5JaF8rSV2xHp7gPYQP5C897crgG/eww="
  });