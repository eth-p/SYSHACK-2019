// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import Class from "@util/Class";

import Recipient from "@chat/Recipient";
// ---------------------------------------------------------------------------------------------------------------------
// RecipientType:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An enum of supported recipient types.
 */
enum RecipientType {

  GROUP = 'GROUP',
  USER = 'USER'

}

namespace RecipientType {
  const map: Map<RecipientType, Class<Recipient>> = new Map();
  const imap: Map<Class<Recipient>, RecipientType> = new Map();

  /**
   * Gets the class object which corresponds to the message type.
   *
   * @param type The message type.
   * @return The message class, or undefined.
   */
  export function asClass(type: RecipientType): Class<Recipient> | undefined {
    return map.get(type);
  }

  /**
   * Gets the MessageType which corresponds to the class object.
   *
   * @param constructor The message class.
   * @return The message class, or undefined.
   */
  export function asType(constructor: Class<Recipient>): RecipientType | undefined {
    return imap.get(constructor);
  }

  /**
   * Registers a message type.
   *
   * @param type The message type.
   * @param constructor The message class.
   */
  export function register(type: RecipientType, constructor: Class<Recipient>): void {
    map.set(type, constructor);
    imap.set(constructor, type);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default RecipientType;
export {RecipientType};
