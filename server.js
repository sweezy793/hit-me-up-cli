
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const app = express();

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:926b8660-260d-473c-b178-f1db68d1ca84",
    key: "d78b517c-fd0a-4259-8f08-d7da4b795a0d:kDBrcEi9XGgw5JaF8rSV2xHp7gPYQP5C897crgG/eww="
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users",(req,res)=>{
    const {username}=req.body;
    chatkit
        .createUser({
            id:username,
            name:username
        })
        .then(()=>{
            console.log(`User created: ${username}`);
            res.sendStatus(201);
        })
        .catch(err=>{
            if(err.error==="services/chatkit/user_already_exists"){
                console.log(`User ${username} already exists`);
                res.sendStatus(200);
            }
            else{
                res.status(err.status).json(err);
            }
        });
});

app.post("/authenticate",(req,res)=>{
    const auth=chatkit.authenticate({userId:req.query.user_id});
    res.status(auth.status).send(auth.body);
});

const port=3000;
app.listen(port,err=>{
    if(err)
    console.log(err);
    else
    console.log(`Running on port ${port}`);
});