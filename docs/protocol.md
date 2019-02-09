# Protocol Documentation

Table of Contents:

- [Terminology](#terminology)
- [Errors](#errors)
- [Types](#types)
- [Packet](#packet)
  - [Message Send](#message-send) (C->S)
  - [Message Receive](#message-receive) (S->C)



## Terminology

| Term       | Definition                                               |
| ---------- | -------------------------------------------------------- |
| Client (C) | The user agent/chat program.                             |
| Server (S) | The remote chat server.                                  |
| Sender     | The device that initiated the packet transmission.       |
| Receiver   | The device that didn't initiate the packet transmission. |

## Errors

- `INVALID_MESSAGE_TYPE`: The client sent a message with an invalid type identifier.
- `INVALID_MESSAGE_PAYLOAD`: The client sent a message with an invalid or incomplete payload.
- `INVALID_MESSAGE_RECIPIENT`: The client sent a message with an invalid recipient identifier.

## Types

| Type              | Definition                                                   |
| ----------------- | ------------------------------------------------------------ |
| `<PACKET ID>`     | A unique, sequential number that identifies a packet.        |
| `<ACTION>`        | A string which corresponds to the intended action.           |
| `<PAYLOAD>`       | A payload for the action.                                    |
| `<DATE>`          | A JavaScript date timestamp, or a UTC-formatted datetime string. |
| `<UUID>`          | A universal unique identifier.                               |
| `<ERROR CODE>`    | An error code string. See [errors section](#errors).         |
| `<ERROR FAULT>`   | An error fault string. This represents who is at fault when an error occurs. |
| `<ERROR MESSAGE>` | The error message.                                           |

**Recipient:** `<RECIPIENT>`

Group:

```json
{
    "[[type]]": "GROUP",
    "uuid": <UUID>
}
```

User:

```json
{
    "[[type]]": "USER",
    "uuid": <UUID>
}
```

## Packet

The basic structure of a packet.

**Client Initiated:**

Client -> Server:

```json
{
    "id": <PACKET ID>,
    "act": <ACTION>,
    "payload": <PAYLOAD>
}
```

Server -> Client (Success):

```json
{
    "id": <PACKET ID>,
    "status": "OK"
}
```

Server -> Client (Failure):

```json
{
    "id": <PACKET ID>,
    "status": "ERROR",
    "error": {
    	"code": <ERROR CODE>
    	"fault": <ERROR FAULT>
    	"message": <ERROR MESSAGE>
	}
}
```

**Server Initiated:**

Server -> Client:

```json
{
    "act": <ACTION>,
    "payload": <PAYLOAD>
}
```



### Message Send

**Action:** `m_send`
**Applies:** Client -> Server
**Payloads:** 

Plain Message:

```json
{
    "[[type]]": "PLAIN",
    "timestamp": <DATE>,
    "uuid": <UUID>,
    "recipient": <RECIPIENT>,
    "data": "The message string."
}
```



### Message Receive

**Action:** `m_recv`
**Applies:** Server -> Client
**Payloads:** 

Plain Message:

```json
{
    "[[type]]": "PLAIN",
    "timestamp": <DATE>,
    "uuid": <UUID>,
    "recipient": <RECIPIENT>,
    "data": "The message string."
}
```

