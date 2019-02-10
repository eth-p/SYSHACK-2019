// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import Recipient from "@chat/Recipient";
import RecipientType from "@chat/RecipientType";
// ---------------------------------------------------------------------------------------------------------------------
// UserRecipient:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A user that can receive a message.
 */
class UserRecipient extends Recipient {

  /**
   * Creates a new recipient.
   * @param uuid The recipient UUID.
   */
  public constructor(uuid: string) {
    super(uuid);
  }

  public get type() {
    return RecipientType.USER;
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default UserRecipient;
export {UserRecipient};
