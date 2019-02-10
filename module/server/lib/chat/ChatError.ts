// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
// ChatError:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An error that occurred during the chat.
 */
class ChatError extends Error {

  /**
   * The error code.
   */
  public readonly code: string|null;

  public constructor(message: string|{code:string,message:string}) {
    super(typeof(message) === 'string' ? message : message.message);
    if (typeof(message) === 'string') {
      this.code = null;
    } else {
      this.code = message.code;
    }
  }

}

namespace ChatError {

  export const INVALID_MESSAGE_TYPE = {
    code: 'INVALID_MESSAGE_TYPE',
    fault: 'IMPLEMENTATION',
    message: 'The client sent a message with an invalid type identifier.'
  };

  export const INVALID_MESSAGE_PAYLOAD = {
    code: 'INVALID_MESSAGE_PAYLOAD',
    fault: 'IMPLEMENTATION',
    message: 'The client sent a message with an invalid or incomplete payload.'
  };

  export const INVALID_MESSAGE_RECIPIENT = {
    code: 'INVALID_MESSAGE_RECIPIENT',
    fault: 'IMPLEMENTATION',
    message: 'The client sent a message with an invalid recipient identifier.'
  };

  export const INVALID_PACKET = {
    code: 'INVALID_PACKET',
    fault: 'IMPLEMENTATION',
    message: 'The client sent an invalid or incomplete packet.'
  };

  export const INVALID_PACKET_ID = {
    code: 'INVALID_PACKET_ID',
    fault: 'IMPLEMENTATION',
    message: 'The client sent a packet with an invalid identifier.'
  };

  export const INVALID_AUTH_REQUEST = {
    code: 'INVALID_AUTH_REQUEST',
    fault: 'IMPLEMENTATION',
    message: 'The client sent an invalid or incomplete authentication packet.'
  };

  export const UNSUPPORTED_ACTION = {
    code: 'UNSUPPORTED_ACTION',
    fault: 'IMPLEMENTATION',
    message: 'The server does not support the requested action.'
  };

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default ChatError;
export {ChatError};
