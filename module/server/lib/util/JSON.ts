// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
// JSON:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An abstract representation of a JSON type.
 */
type JSON = JSON.Object | JSON.Arr | JSON.Value;

namespace JSON {

  export type Value = string | number | boolean | null;

  export interface Object {
    [key: string]: JSON
  }

  export interface Arr extends Array<JSON> {
    [key: number]: JSON
  }

}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default JSON;
export {JSON};
