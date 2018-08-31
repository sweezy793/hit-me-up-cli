# hit-me-up-cli
A realtime Node.js communication CLI created with the help of Pusher Channels for those who want to chat hacker-esque.

## Bugs

ATM chats are not stored in any kind of database

## How to use
* `git clone` or download the zip
* `npm install` to install all dependencies
* ATM my pusher account is authenticated with this CLI, so if you want yours, create a Pusher account and change the Instance Locator and Secret Key accordingly
* Run server in background with `node server.js`
* To run CLI, run `node client.js` and connect to same chat room as recipient

## Built With

* [express](https://github.com/expressjs/express) Fast, unopinionated, minimalist web framework for node
* [@pusher/chatkit-server](https://github.com/pusher/chatkit-server-node) The Node.js server SDK for Pusher Chatkit
* [@pusher/chatkit](https://github.com/pusher/chatkit-client-js) The JavaScript client for Pusher Chatkit
* [axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
* [prompt](https://github.com/flatiron/prompt) A beautiful command-line prompt for node.js

## Screenshot

![alt text](https://raw.githubusercontent.com/sweezy793/hit-me-up-cli/master/ss.png)
