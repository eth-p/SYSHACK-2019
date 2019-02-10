// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/Hydration';
import JSON from "@util/JSON";

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import Packet from "@chat/Packet";
import PacketDirection from '@chat/PacketDirection';
import Message from '@chat/Message';
// ---------------------------------------------------------------------------------------------------------------------
// M_CLIENT Packet:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A message from the client to the server.
 */
class M_CLIENT extends Packet<Message> {

  public constructor(id: number, payload: Message) {
    super(id);
    (this as any).payload = payload;
  }

  get act(): Action {
    return Action.M_CLIENT;
  }

  get direction(): PacketDirection {
    return PacketDirection.CLIENT_TO_SERVER;
  }

  get acknowledgeable(): boolean {
    return true;
  }

  // *-----------*
  // | Hydration |
  // *-----------*

  protected static [dehydrate.fn](this: M_CLIENT, json: JSON.Object) {
    json.payload = Message.encode(this.payload!);
  }

  protected static [rehydrate.fn](this: M_CLIENT & any, json: JSON.Object) {
    if (typeof(json.payload) !== 'object' || json.payload == null) throw new ChatError(ChatError.INVALID_PACKET);
    this.payload = Message.decode(json.payload);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default M_CLIENT;
export {M_CLIENT};
