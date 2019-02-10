// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import "@chat/register";
import * as fs from 'fs';
import * as path from 'path';
import {sample} from 'lodash';

// ---------------------------------------------------------------------------------------------------------------------
// INTERIM:
// ---------------------------------------------------------------------------------------------------------------------

const RANDOM_NAMES: string[] = [
  'XxHaxor90sxX',
  'John Smith',
];

const RANDOM_IMGS: string[] = fs.readdirSync(path.resolve(__dirname, '../../../../client/reactapp/public/assets/images'));

// ---------------------------------------------------------------------------------------------------------------------
// INTERIM:
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Methods for generating data that we don't have time to implement.
 */
class INTERIM {

  public static generateRandomName(): string {
    return sample(RANDOM_NAMES);
  }

  public static generateRandomImage(): string {
    return sample(RANDOM_IMGS);
  }

}


// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export default INTERIM;
export {INTERIM};
