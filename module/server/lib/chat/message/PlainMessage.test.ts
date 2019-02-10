// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
// ---------------------------------------------------------------------------------------------------------------------
import PlainMessage from "@chat/message/PlainMessage";

import Message from "@chat/Message";
import MessageType from "@chat/MessageType";
import UserRecipient from "@chat/recipient/UserRecipient";
// ---------------------------------------------------------------------------------------------------------------------

describe('PlainMessage', () => {
  it('constructor', () => {
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, -1);
    expect(message.uuid).toStrictEqual('1234');
    expect(message.type).toStrictEqual(MessageType.PLAIN);
    expect(message.recipient.uuid).toStrictEqual('world');
    expect(message.data).toStrictEqual('hello');
    expect(message.metadata).toEqual({test: 123});
    expect(message.timestamp).not.toStrictEqual(-1);
  });

  it('encode', () => {
    let now = Date.now();
    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, now);
    let json = Message.encode(message);

    expect(json).toEqual({
      '[[type]]': 'PLAIN',
      'recipient': {
        '[[type]]': 'USER',
        'uuid': 'world'
      },
      'uuid': '1234',
      'data': 'hello',
      'timestamp': (new Date(now)).toUTCString(),
      'metadata': {
        test: 123
      }
    });
  });


  it('decode', () => {
    let now = new Date();

    let message = new PlainMessage('1234', new UserRecipient('world'), 'hello', {test: 123}, now);
    let rehy = Message.decode({
      '[[type]]': 'PLAIN',
      'recipient': {
        '[[type]]': 'USER',
        'uuid': 'world'
      },
      'uuid': '1234',
      'data': 'hello',
      'timestamp': now,
      'metadata': {
        test: 123
      }
    });

    expect(message).toEqual(rehy);
  })
});
