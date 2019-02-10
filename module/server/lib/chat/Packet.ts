// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from '@util/hydration';
import JSON from '@util/JSON';

import Action from "@chat/Action";
import ChatError from "@chat/ChatError";
import PacketDirection from "@chat/PacketDirection";
// ---------------------------------------------------------------------------------------------------------------------
// Message:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An abstract API packet.
 * @param T The packet payload type.
 */
abstract class Packet<T = unknown> {

  public readonly payload: T | null;
  public readonly id: number;

  /**
   * Creates a new packet.
   *
   * @param id The packet ID.
   */
  protected constructor(id: number) {
    if (id < 0) throw new ChatError(ChatError.INVALID_PACKET_ID);

    this.id = id;
    this.payload = null;
  }

  /**
   * Gets the packet action.
   */
  abstract get act(): Action;

  /**
   * Gets the expected packet direction.
   */
  abstract get direction(): PacketDirection;

  /**
   * Gets whether or not the packet should be acknowledged by the other party.
   */
  abstract get acknowledgeable(): boolean;

  // *-----------*
  // | Hydration |
  // *-----------*

  protected static [dehydrate.fn](this: Packet<unknown>, json: JSON.Object) {
    json.id = this.id;
    json.act = Action.asType(this)!;
  }

  protected static [rehydrate.fn](this: Packet<unknown> & any, json: JSON.Object) {
    if (typeof (json.id) !== 'number' || json.id < 0) throw new ChatError(ChatError.INVALID_PACKET_ID);
    this.id = json.id;
  }

}

namespace Packet {

  /**
   * Decodes the raw packet JSON into a packet object.
   *
   * @param raw The raw JSON.
   * @return The packet object.
   * @throws ChatError
   */
  export function decode(raw: JSON & any): Packet<unknown> {
    if (typeof (raw) !== 'object') throw new ChatError(ChatError.INVALID_PACKET);
    if (Action.asClass(raw['act']) === undefined) throw new ChatError(ChatError.UNSUPPORTED_ACTION);
    raw['[[type]]'] = raw['act'];

    return rehydrate(raw, Packet, Action.asClass);
  }

  /**
   * Encodes the message object into raw JSON.
   *
   * @param message The message object.
   * @return The raw JSON.
   */
  export function encode(message: Packet): JSON {
    let json: JSON.Object = dehydrate(message, Packet, Action.asType) as JSON.Object;

    json.act = json['[[type]]'];
    delete json['[[type]]'];

    return json;
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Packet;
export {Packet};
