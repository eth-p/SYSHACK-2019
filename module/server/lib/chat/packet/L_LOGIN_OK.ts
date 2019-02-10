// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';
import JSON from "@util/JSON";

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import Packet from "@chat/Packet";
import PacketDirection from '@chat/PacketDirection';

import AuthRequest from "@chat/AuthRequest";
// ---------------------------------------------------------------------------------------------------------------------
// L_LOGIN_OK Packet:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A successful response to the client's login packet.
 */
class L_LOGIN_OK extends Packet<AuthRequest> {

  public constructor(id: number, payload: AuthRequest) {
    super(id);
    (this as any).payload = payload;
  }

  get act(): Action {
    return Action.L_LOGIN_OK;
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

  protected static [dehydrate.fn](this: L_LOGIN_OK, json: JSON.Object) {
    json.payload = this.payload as unknown as JSON.Object;
  }

  protected static [rehydrate.fn](this: L_LOGIN_OK & any, json: JSON.Object) {
    if (typeof(json.payload) !== 'object' || json.payload == null) throw new ChatError(ChatError.INVALID_PACKET);
    if (typeof((json.payload as JSON.Object).username) !== 'string') throw new ChatError(ChatError.INVALID_AUTH_REQUEST);
    if (typeof((json.payload as JSON.Object).authkey) !== 'string') throw new ChatError(ChatError.INVALID_AUTH_REQUEST);

    this.payload = json.payload;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default L_LOGIN_OK;
export {L_LOGIN_OK};
