// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
import UserInstance from "@chat/server/UserInstance";

import Filter = require('bad-words');
import SocketIO = require("socket.io");

const CURSING = new Filter({
  placeHolder: '*'
});

// ---------------------------------------------------------------------------------------------------------------------
// Server:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The master class of the chat server.
 */
class Server {

  private server: SocketIO.Server;
  private users: Map<String, UserInstance>;
  private username: number;

  public constructor(io: SocketIO.Server) {
    this.server = io;
    this.server.on('connection', this.onConnect.bind(this));
    this.users = new Map();
    this.username = 0;
  }

  public onConnect(socket: SocketIO.Socket) {
    // TODO: Finish it
    let username = (this.username++).toString();
    let user = new UserInstance(socket, username, 'no time :(');
    let userPublic = {
      user: user.name,
      username: user.username,
      picture: user.picture
    };

    this.users.set(username, user);

    socket.on('disconnect', () => {
      socket.broadcast.emit('chat status', {message: `${user.name} left the chat.`});
      this.users.delete(username);
    });

    socket.on('chat message', (message: string) => {
      let fixed = message.trim();
      if (fixed.length === 0) return;

      if (fixed.length > 1000) {
        socket.emit('chat error', {message: "No copypasta, please."});
        return;
      }

      if (/(?:a\/?s\/?l)/i.test(message)) {
        socket.emit('chat error', {message: "No. Just no."});
        return;
      }

      if (/<\/? *[a-z\-]+ *>/i.test(message)) {
        socket.emit('chat error', {message: "Nice try."});
        return;
      }

      console.log("RECV FROM " + user.username + " :: " + message);
      this.server.sockets.emit('chat message', {message: CURSING.clean(message), user: userPublic});
    });

    socket.on('chat nudge', () => {
      socket.broadcast.emit('chat nudge', {});
      socket.emit('chat status', {message: 'You sent a nudge!'});
      socket.broadcast.emit('chat status', {message: `${user.name} nudged you!`});
    });

    socket.broadcast.emit('join', userPublic);
    socket.broadcast.emit('chat status', {message: `${user.name} joined the chat.`});
    socket.emit('info', userPublic);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Server;
export {Server};
