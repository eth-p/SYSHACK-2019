// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import RecipientType from "@chat/RecipientType";
import MessageType from "@chat/MessageType";
import Action from "@chat/Action";

// Messages:
import PlainMessage from "@chat/message/PlainMessage";

// Recipients:
import UserRecipient from "@chat/recipient/UserRecipient";
import GroupRecipient from "@chat/recipient/GroupRecipient";

// Packets:
import M_CLIENT from "@chat/packet/M_CLIENT";
import M_SERVER from "@chat/packet/M_SERVER";
import L_LOGIN from "@chat/packet/L_LOGIN";
import L_LOGIN_OK from "@chat/packet/L_LOGIN_OK";
import L_LOGIN_DENIED from "@chat/packet/L_LOGIN_DENIED";

// ---------------------------------------------------------------------------------------------------------------------
// Registrations:
// ---------------------------------------------------------------------------------------------------------------------

RecipientType.register(RecipientType.USER, UserRecipient);
RecipientType.register(RecipientType.GROUP, GroupRecipient);

MessageType.register(MessageType.PLAIN, PlainMessage);

Action.register(Action.M_CLIENT, M_CLIENT);
Action.register(Action.M_SERVER, M_SERVER);
Action.register(Action.L_LOGIN, L_LOGIN);
Action.register(Action.L_LOGIN_OK, L_LOGIN_OK);
Action.register(Action.L_LOGIN_DENIED, L_LOGIN_DENIED);
