// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/Hydration';
import JSON from '@util/JSON';

import ChatError from "@chat/ChatError";
import MessageType from '@chat/MessageType';
import Metadata from '@chat/Metadata';
import Recipient from '@chat/Recipient';
import Timestamp from '@chat/Timestamp';
// ---------------------------------------------------------------------------------------------------------------------
// Message:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An abstract communications message.
 * @param T The message payload type.
 */
abstract class Message<T = unknown> {

  public readonly data: T;
  public readonly uuid: string;
  public readonly metadata: Metadata;
  public readonly recipient: Recipient;
  public readonly timestamp: Timestamp;

  /**
   * Creates a new chat message.
   *
   * @param uuid The message UUID.
   * @param receiver The message receiver.
   * @param data The message data.
   *
   * @param [metadata] Additional message metadata.
   * @param [timestamp] The message timestamp.
   */
  protected constructor(uuid: string, receiver: Recipient, data: T, metadata?: Metadata, timestamp?: Timestamp) {
    this.recipient = receiver;
    this.uuid = uuid;
    this.data = data;
    this.timestamp = (timestamp == null ? Date.now() : timestamp);
    this.metadata = metadata == null ? {} : metadata;

    if (timestamp == null || Math.abs(Date.now() - Timestamp.toNumber(this.timestamp)) > Message.TIMESTAMP_TRUST_THRESHOLD) {
      this.timestamp = Date.now();
    }
  }

  /**
   * Gets the message type.
   */
  abstract get type(): MessageType;

  // *-----------*
  // | Hydration |
  // *-----------*

  protected static [dehydrate.fn](this: Message<unknown>, json: JSON.Object) {
    json.recipient = Recipient.encode(this.recipient);
    json.metadata = Metadata.encode(this.metadata);
    json.timestamp = Timestamp.toString(this.timestamp);
  }

  protected static [rehydrate.fn](this: Message<unknown> & any, json: JSON.Object) {
    if (json.uuid === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    if (json.data === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    if (json.recipient === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    if (json.typestamp !== undefined && !(typeof(json.timestamp) !== 'string' || typeof(json.timestamp !== 'number'))) {
      throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    }

    this.recipient = Recipient.decode(json.recipient);
    this.metadata = json.metadata == null ? {} : json.metadata;
    this.timestamp = json.timestamp == null ? Date.now() : Timestamp.decode(json.timestamp as string|number);
    this.data = json.data;
    this.uuid = json.uuid;
  }

}

namespace Message {

  /**
   * The number of milliseconds before the server should consider the client's timestamp forged.
   * If this is the case, the server will insert its own timestamp.
   */
  export const TIMESTAMP_TRUST_THRESHOLD = 2000;

  /**
   * Decodes the raw message JSON into a message object.
   *
   * @param raw The raw JSON.
   * @return The message object.
   * @throws ChatError
   */
  export function decode(raw: JSON & any): Message {
    if (typeof (raw) !== 'object') throw new ChatError(ChatError.INVALID_MESSAGE_PAYLOAD);
    if (MessageType.asClass(raw['[[type]]']) === undefined) throw new ChatError(ChatError.INVALID_MESSAGE_TYPE);
    return rehydrate(raw, Message, MessageType.asClass);
  }

  /**
   * Encodes the message object into raw JSON.
   *
   * @param message The message object.
   * @return The raw JSON.
   */
  export function encode(message: Message): JSON {
    return dehydrate(message, Message, MessageType.asType);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Message;
export {Message};
