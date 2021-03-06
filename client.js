#!/usr/bin/env node

const {ChatManager, TokenProvider} = require('@pusher/chatkit');
const {JSDOM} = require('jsdom');
const util = require('util');
const prompt=require('prompt');
const axios=require('axios');
const ora = require('ora');
const chalk=require('chalk');
const clear=require('clear');
const figlet=require('figlet');
const chalkAnimation = require('chalk-animation');
var colors = require("colors/safe");
const color=require('colors');
const readline = require('readline');
const rainbow = chalkAnimation.rainbow(figlet.textSync('Hit Me Up!', { horizontalLayout: 'full' }));


const makeChatkitNodeCompatible = () => {  //chatkit-client works properly in browser but not node. makeChatkitNodeCompatible makes it work the same as it does in browser
    const {window} = new JSDOM();
    global.window = window;
    global.navigator = {};
  };

makeChatkitNodeCompatible();

const createUser=async username=>{
  try{
    await axios.post('http://localhost:3000/users',{username});
  }
  catch({message})
  {
    throw new Error(`Couldn't create user, ${message}`);
  }
};




const main = async () => {
  const spinner = ora();
    try {
      prompt.start();
      prompt.message='';
      const get=util.promisify(prompt.get);

      const userSchema=[
        {
          description:colors.cyan('Enter username'),
          name:'username',
          required:true,
        },
      ];

      const {username}=await get(userSchema);
      spinner.start('Authenticating..');
      await createUser(username);
      spinner.succeed(`Authenticated as ${username}`);


      const chat=new ChatManager({
        instanceLocator:'v1:us1:926b8660-260d-473c-b178-f1db68d1ca84',
        userId:username,
        tokenProvider:new TokenProvider({url: 'http://localhost:3000/authenticate'})
      });

      spinner.start('Connecting to Pusher..');
      const currentUser=await chat.connect();
      spinner.succeed('Connected');


      spinner.start('Fetching rooms..');
      const joinableRooms = await currentUser.getJoinableRooms();
      spinner.succeed('Fetched rooms');

      const availableRooms = [...currentUser.rooms, ...joinableRooms];

      console.log('Available rooms:');
      availableRooms.forEach((room, index) => {
      console.log(`${index} - ${room.name}`);
      });



      const chatRoomSchema=[{
        description:colors.cyan('Select a room'),
        name:'room',
        conform:v=>{
          if(v>=availableRooms.length)
          {
            return false;
          }
          return true;
        },
        message:'Select room in numbers',
        required:true
      }]

      const {room:selectedRoom}=await get(chatRoomSchema);
      const room=availableRooms[selectedRoom];
      
      //subscribing to a room and recieving message
      spinner.start(`Joining chat room ${selectedRoom}..`);
      await currentUser.subscribeToRoom({
        roomId:room.id,
        hooks:{
          onNewMessage:message=>{  //onNewMessage is a hook function is which called when a message is recieved
            const {senderId,text}=message;
            if(senderId==username)
            return ;
            console.log(`${senderId}:${text}`.yellow);
          }
        },
        messageLimit:0
      })
      spinner.succeed(`Joined ${room.name} chat`);


      //sending message
      const input=readline.createInterface({input:process.stdin});

      input.on('line',async text=>{
        await currentUser.sendMessage({roomId:room.id,text});
      })




    } catch (err) {
      spinner.fail();
      console.log(`Failed with ${err}`);
      process.exit(1);
    }
  }
  setTimeout(() => {
    // Stop the 'Lorem ipsum' animation, then write on a new line.
    main();
    rainbow.stop();
}, 2500);
 