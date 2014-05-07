A very simple socket.io-based signalling server intended for use with the [Steeplechase] test harness. It provides a very basic concept of "rooms" which clients can connect to, determine when there are enough parties present, and send broadcast messages to all other clients in the room.

Installation
============

This package requires node.js. Run `npm install` in the checked-out repository directory to install the node.js prerequisites.

Usage
=====

Run `node server.js` to run the server.

[Steeplechase]: https://github.com/luser/steeplechase
