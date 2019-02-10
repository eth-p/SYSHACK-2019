// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
import INTERIM from '@chat/server/INTERIM';

import SocketIO = require("socket.io");

// ---------------------------------------------------------------------------------------------------------------------
// UserInstance:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A user in the chat server.
 */
class UserInstance {

  public name: string;
  public picture: string;
  public readonly socket: SocketIO.Socket;
  public readonly username: string;
  public readonly authkey: string;

  public constructor(socket: SocketIO.Socket, username: string, authkey: string) {
    this.socket = socket;
    this.name = INTERIM.generateRandomName();
    this.picture = INTERIM.generateRandomImage();
    this.username = username;
    this.authkey = authkey;
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default UserInstance;
export {UserInstance};
