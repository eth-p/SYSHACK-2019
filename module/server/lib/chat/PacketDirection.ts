// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
// PacketType:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A bitfield of packet directions.
 */
enum PacketDirection {

  SERVER_TO_CLIENT = 1 << 0,
  CLIENT_TO_SERVER = 1 << 1

}


// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default PacketDirection;
export {PacketDirection};
