// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
// ---------------------------------------------------------------------------------------------------------------------
import PlainMessage from "@chat/message/PlainMessage";

import Action from "@chat/Action";
import Message from "@chat/Message";
import Packet from "@chat/Packet";
import PacketDirection from "@chat/PacketDirection";
import UserRecipient from "@chat/recipient/UserRecipient";

import M_SERVER from "@chat/packet/M_SERVER";
// ---------------------------------------------------------------------------------------------------------------------

describe('M_SERVER', () => {
  it('constructor', () => {
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, -1);
    let packet = new M_SERVER(0, message);

    expect(packet.act).toEqual(Action.M_SERVER);
    expect(packet.payload).toEqual(message);
    expect(packet.id).toEqual(0);
    expect(packet.direction).toEqual(PacketDirection.SERVER_TO_CLIENT);
    expect(packet.acknowledgeable).toEqual(false);

    expect(() => new M_SERVER(-1, message)).toThrowError();
  });

  it('encode', () => {
    let now = Date.now();
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, now);
    let message_json = Message.encode(message);

    let packet = new M_SERVER(0, message);
    let json = Packet.encode(packet);

    expect(json).toEqual({
      'act': 'M_SERVER',
      'payload': message_json,
      'id': 0
    });
  });

  it('decode', () => {
    let rehy = Packet.decode({
      act: "M_SERVER",
      id: 0,
      payload: {
      '[[type]]': 'PLAIN',
      'recipient': {
        '[[type]]': 'USER',
        'uuid': 'world'
      },
      'uuid': '1234',
      'data': 'hello',
      'timestamp': -1,
      'metadata': {
        test: 123
      }
    }});

    expect(rehy.id).toEqual(0);
    expect(rehy.act).toEqual(Action.M_SERVER);
    expect(rehy.payload).toBeInstanceOf(PlainMessage);
  })
});
