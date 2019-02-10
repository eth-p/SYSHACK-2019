// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
// Timestamp:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An object representing a timestamp since the Epoch.
 */
type Timestamp = Date | number | string;

namespace Timestamp {

  /**
   * Converts a timestamp to a JavaScript Date object.
   *
   * @param ts The timestamp.
   * @return The Date object.
   */
  export function toDate(ts: Timestamp): Date {
    if (ts instanceof Date) return ts;
    return new Date(ts);
  }

  /**
   * Converts a timestamp to a UTC date string.
   *
   * @param ts The timestamp.
   * @return The date string.
   */
  export function toString(ts: Timestamp): string {
    if (typeof (ts) === 'string') return ts;
    return toDate(ts).toUTCString();
  }

  /**
   * Converts a timestamp into its number representation.
   *
   * @param ts The timestamp.
   * @return The date timestamp.
   */
  export function toNumber(ts: Timestamp): number {
    if (typeof (ts) === 'number') return ts;
    return toDate(ts).getTime();
  }

  /**
   * Decodes the raw data into a timestamp.
   *
   * @param raw The raw data.
   * @return The date timestamp.
   */
  export function decode(raw: string|number): Timestamp {
    return toDate(raw);
  }

  /**
   * Encodes the timestamp into raw data.
   *
   * @param ts The timestamp.
   * @return The raw data.
   */
  export function encode(ts: Timestamp): string {
    return toString(ts);
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Timestamp;
export {Timestamp};
