// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/Hydration';
import JSON from '@util/JSON';

import ChatError from "@chat/ChatError";
import RecipientType from "@chat/RecipientType";
// ---------------------------------------------------------------------------------------------------------------------
// Recipient:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An abstract class representing a user that can receive a message.
 */
abstract class Recipient {

  /**
   * The recipient UUID.
   */
  public readonly uuid:string;

  /**
   * Creates a new recipient.
   * @param uuid The recipient UUID.
   */
  protected constructor(uuid: string) {
    this.uuid = uuid;
  }

  /**
   * Gets the recipient type.
   */
  abstract get type(): RecipientType;

  // *-----------*
  // | Hydration |
  // *-----------*

  protected static [dehydrate.fn](this: Recipient, json: JSON.Object) {
    json.uuid = this.uuid;
  }

  protected static [rehydrate.fn](this: Recipient & any, json: JSON.Object) {
    if (json.uuid === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_RECIPIENT);
    this.uuid = json.uuid;
  }

}

namespace Recipient {

  /**
   * Decodes the raw recipient JSON into a recipient object.
   *
   * @param raw The raw JSON.
   * @return The recipient object.
   * @throws ChatError
   */
  export function decode(raw: JSON & any): Recipient {
    if (typeof (raw) !== 'object') throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    if (RecipientType.asClass(raw['[[type]]']) === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_TYPE);
    return rehydrate(raw, Recipient, RecipientType.asClass);
  }

  /**
   * Encodes the recipient object into raw JSON.
   *
   * @param recipient The recipient object.
   * @return The raw JSON.
   */
  export function encode(recipient: Recipient): JSON {
    return dehydrate(recipient, Recipient, RecipientType.asType);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Recipient;
export {Recipient};
