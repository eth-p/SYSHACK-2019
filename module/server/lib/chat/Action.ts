// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import Class from "@util/Class";

import Message from "@chat/Message";
import Packet from "@chat/Packet";
// ---------------------------------------------------------------------------------------------------------------------
// PacketType:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An enum of supported API actions.
 */
enum Action {

  M_CLIENT = 'M_CLIENT',
  M_SERVER = 'M_SERVER',
  L_LOGIN = 'L_LOGIN',
  L_LOGIN_OK = 'L_LOGIN_OK',
  L_LOGIN_DENIED = 'L_LOGIN_DENIED',
  L_REGISTER = 'L_REGISTER'

}

namespace Action {
  const map: Map<Action, Class<Message>> = new Map();
  const imap: Map<Class<Message>, Action> = new Map();

  /**
   * Gets the message class which corresponds to the packet action.
   *
   * @param type The packet action.
   * @return The message class, or undefined.
   */
  export function asClass(type: Action): Class<Message> | undefined {
    return map.get(type);
  }

  /**
   * Gets the Action which corresponds to the message class.
   *
   * @param constructor The message class.
   * @return The message class, or undefined.
   */
  export function asType(constructor: Class<Message>): Action | undefined {
    return imap.get(constructor);
  }

  /**
   * Registers an action.
   *
   * @param type The action.
   * @param constructor The message class.
   */
  export function register(type: Action, constructor: Class<Packet>): void {
    map.set(type, constructor);
    imap.set(constructor, type);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Action;
export {Action};
