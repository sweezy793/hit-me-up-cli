const {ChatManager, TokenProvider} = require('@pusher/chatkit');
const {JSDOM} = require('jsdom');
const util = require('util');
const prompt=require('prompt');
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');


const makeChatkitNodeCompatible = () => {  //chatkit-client works properly in browser but not node. makeChatkitNodeCompatible makes it work the same as it does in browser
    const {window} = new JSDOM();
    global.window = window;
    global.navigator = {};
  };

makeChatkitNodeCompatible();

clear();
console.log(
  chalk.whiteBright.bgRed.bold(
    figlet.textSync('Hit Me Up!', { horizontalLayout: 'full' })
  )
);

const main = async () => {
    try {
      prompt.start();
      prompt.message='';
      const get=util.promisify(prompt.get);

      const userSchema=[
        {
          description:'Enter username',
          name:'username',
          required:true,
        },
      ];

      const {username}=await get(userSchema);

    } catch (err) {
      console.log(`Failed with ${err}`);
      process.exit(1);
    }
  }
  main();