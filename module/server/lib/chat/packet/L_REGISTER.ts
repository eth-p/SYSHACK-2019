// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';
import JSON from "@util/JSON";

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import Packet from "@chat/Packet";
import PacketDirection from '@chat/PacketDirection';

import AuthRegister from "@chat/AuthRegister";
// ---------------------------------------------------------------------------------------------------------------------
// L_REGISTER Packet:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A registration request from the client.
 */
class L_REGISTER extends Packet<AuthRegister> {

  public constructor(id: number, payload: AuthRegister) {
    super(id);
    (this as any).payload = payload;
  }

  get act(): Action {
    return Action.L_REGISTER;
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

  protected static [dehydrate.fn](this: L_REGISTER, json: JSON.Object) {
    json.payload = this.payload as unknown as JSON.Object;
  }

  protected static [rehydrate.fn](this: L_REGISTER & any, json: JSON.Object) {
    if (typeof(json.payload) !== 'object' || json.payload == null) throw new ChatError(ChatError.INVALID_PACKET);
    if (typeof((json.payload as JSON.Object).username) !== 'string') throw new ChatError(ChatError.INVALID_AUTH_REQUEST);
    if (typeof((json.payload as JSON.Object).authkey) !== 'string') throw new ChatError(ChatError.INVALID_AUTH_REQUEST);

    this.payload = json.payload;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default L_REGISTER;
export {L_REGISTER};
