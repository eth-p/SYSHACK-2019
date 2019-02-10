// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import Class from "@util/Class";

import Message from "@chat/Message";
// ---------------------------------------------------------------------------------------------------------------------
// MessageType:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An enum of supported message types.
 */
enum MessageType {

  PLAIN = 'PLAIN'

}

namespace MessageType {
  const map: Map<MessageType, Class<Message>> = new Map();
  const imap: Map<Class<Message>, MessageType> = new Map();

  /**
   * Gets the class object which corresponds to the message type.
   *
   * @param type The message type.
   * @return The message class, or undefined.
   */
  export function asClass(type: MessageType): Class<Message> | undefined {
    return map.get(type);
  }

  /**
   * Gets the MessageType which corresponds to the class object.
   *
   * @param constructor The message class.
   * @return The message class, or undefined.
   */
  export function asType(constructor: Class<Message>): MessageType | undefined {
    return imap.get(constructor);
  }

  /**
   * Registers a message type.
   *
   * @param type The message type.
   * @param constructor The message class.
   */
  export function register(type: MessageType, constructor: Class<Message>): void {
    map.set(type, constructor);
    imap.set(constructor, type);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default MessageType;
export {MessageType};
