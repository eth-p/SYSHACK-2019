// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';
import JSON from "@util/JSON";

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import Packet from "@chat/Packet";
import PacketDirection from '@chat/PacketDirection';
import Message from '@chat/Message';
// ---------------------------------------------------------------------------------------------------------------------
// M_SERVER Packet:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A message from the server to the client.
 */
class M_SERVER extends Packet<Message> {

  public constructor(id: number, payload: Message) {
    super(id);
    (this as any).payload = payload;
  }

  get act(): Action {
    return Action.M_SERVER;
  }

  get direction(): PacketDirection {
    return PacketDirection.SERVER_TO_CLIENT;
  }

  get acknowledgeable(): boolean {
    return false;
  }

  // *-----------*
  // | Hydration |
  // *-----------*

  protected static [dehydrate.fn](this: M_SERVER, json: JSON.Object) {
    json.payload = Message.encode(this.payload!);
  }

  protected static [rehydrate.fn](this: M_SERVER & any, json: JSON.Object) {
    if (typeof (json.payload) !== 'object' || json.payload == null) throw new ChatError(ChatError.INVALID_PACKET);
    this.payload = Message.decode(json.payload);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default M_SERVER;
export {M_SERVER};
