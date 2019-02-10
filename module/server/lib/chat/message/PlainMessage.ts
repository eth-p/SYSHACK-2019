// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';

import Message from '@chat/Message';
import MessageType from '@chat/MessageType';
import Metadata from '@chat/Metadata';
import Recipient from '@chat/Recipient';
import Timestamp from '@chat/Timestamp';
// ---------------------------------------------------------------------------------------------------------------------
// Message:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A plain message.
 */
class PlainMessage extends Message<string> {

  /**
   * Creates a new plain message.
   *
   * @param uuid The message UUID.
   * @param receiver The message receiver.
   * @param data The message data.
   *
   * @param [metadata] Additional message metadata.
   * @param [timestamp] The message timestamp.
   */
  public constructor(uuid: string, receiver: Recipient, data: string, metadata?: Metadata, timestamp?: Timestamp) {
    super(uuid, receiver, data, metadata, timestamp);
  }

  get type(): MessageType {
    return MessageType.PLAIN;
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default PlainMessage;
export {PlainMessage};
