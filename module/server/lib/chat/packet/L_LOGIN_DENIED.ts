// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';
import JSON from "@util/JSON";

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import Packet from "@chat/Packet";
import PacketDirection from '@chat/PacketDirection';
// ---------------------------------------------------------------------------------------------------------------------
// L_LOGIN_DENIED Packet:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An unsuccessful response to the client's login packet.
 */
class L_LOGIN_DENIED extends Packet<string> {

  public constructor(id: number, payload: string) {
    super(id);
    (this as any).payload = payload;
  }

  get act(): Action {
    return Action.L_LOGIN_DENIED;
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

  protected static [dehydrate.fn](this: L_LOGIN_DENIED, json: JSON.Object) {
    json.payload = this.payload;
  }

  protected static [rehydrate.fn](this: L_LOGIN_DENIED & any, json: JSON.Object) {
    if (typeof(json.payload) !== 'string') throw new ChatError(ChatError.INVALID_PACKET);
    this.payload = json.payload;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default L_LOGIN_DENIED;
export {L_LOGIN_DENIED};
