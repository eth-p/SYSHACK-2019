// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import JSON from '@util/JSON';
// ---------------------------------------------------------------------------------------------------------------------
// Metadata:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Message metadata.
 * This can contain literally anything, but has a maximum size limit.
 */
type Metadata = JSON;

namespace Metadata {

  /**
   * Decodes the metadata into an object.
   *
   * @param raw The raw data.
   * @return The metadata object.
   */
  export function decode(raw: JSON): Metadata {
    return raw as JSON;
  }

  /**
   * Encodes the metadata into JSON.
   *
   * @param metadata The metadata object.
   * @return The raw data.
   */
  export function encode(metadata: Metadata): JSON {
    return metadata as Metadata;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default Metadata;
export {Metadata};
