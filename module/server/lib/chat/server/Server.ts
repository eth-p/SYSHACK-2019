// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
import UserInstance from "@chat/server/UserInstance";

import SocketIO = require("socket.io");

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
      this.users.delete(username);
    });

    socket.on('chat message', (message) => {
      socket.broadcast.emit('message', {message: message, user: userPublic});
    });

    socket.broadcast.emit('join', userPublic);
    socket.send('info', userPublic);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Server;
export {Server};
