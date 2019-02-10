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

import M_CLIENT from "@chat/packet/M_CLIENT";
// ---------------------------------------------------------------------------------------------------------------------

describe('M_CLIENT', () => {
  it('constructor', () => {
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, -1);
    let packet = new M_CLIENT(0, message);

    expect(packet.act).toEqual(Action.M_CLIENT);
    expect(packet.payload).toEqual(message);
    expect(packet.id).toEqual(0);
    expect(packet.direction).toEqual(PacketDirection.CLIENT_TO_SERVER);
    expect(packet.acknowledgeable).toEqual(true);

    expect(() => new M_CLIENT(-1, message)).toThrowError();
  });

  it('encode', () => {
    let now = Date.now();
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, now);
    let message_json = Message.encode(message);

    let packet = new M_CLIENT(0, message);
    let json = Packet.encode(packet);

    expect(json).toEqual({
      'act': 'M_CLIENT',
      'payload': message_json,
      'id': 0
    });
  });

  it('decode', () => {
    let rehy = Packet.decode({
      act: "M_CLIENT",
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
    expect(rehy.act).toEqual(Action.M_CLIENT);
    expect(rehy.payload).toBeInstanceOf(PlainMessage);
  })
});
