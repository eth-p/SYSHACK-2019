// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import Class from "@util/Class";
import JSON from "@util/JSON";
import HydrationError from "@util/HydrationError";
// ---------------------------------------------------------------------------------------------------------------------
// Hydration (Metaprogramming Re/dehydrator):
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Rehydrates a JSON object into instances of a class.
 * This will call the class' static `rehydrate` method if it exists.
 *
 * @param from The JSON to rehydrate.
 * @param target The target class.
 * @param mapper The class mapper function. This should be used to determine the correct subclass.
 *
 * @throws HydrationError When something goes wrong.
 */
function rehydrate<T>(from: JSON, target: Class<T>, mapper?: (type: string) => Class<T>|undefined): T {
  if (from === null || typeof (from) != 'object') throw new HydrationError(`Cannot rehydrate a ${typeof from}.`);

  let constructor: any = (mapper == null) ? target : mapper(from['[[type]]']);
  let instance: T = Object.create(constructor.prototype);
  while ((constructor.prototype instanceof target) || constructor === target) {
    if (constructor[rehydrate.fn] != null) {
      constructor[rehydrate.fn].call(instance, from);
    }

    constructor = Object.getPrototypeOf(constructor);
  }

  return instance;
}

namespace rehydrate {
  export const fn = Symbol('[[rehydrate]]');
}

/**
 * Dehydrates an instance of a class into a JSON object.
 * This will call the class' static `dehydrate` method if it exists.
 *
 * @param from The instance to dehydrate.
 * @param target The base class.
 * @param mapper The class mapper function. This should be used to determine the "[[type]]" field.
 *
 * @throws HydrationError When something goes wrong.
 */
function dehydrate<T>(from: T, target: Class<T>, mapper?: (type: Class<T>) => string|undefined): JSON {
  let constructor: any = from.constructor;
  let type: string = (mapper == null) ? constructor.name : mapper(constructor as Class<T>);
  let json: any = Object.assign({}, from);
  json['[[type]]'] = type;

  while ((constructor.prototype instanceof target) || constructor === target) {
    if (constructor[dehydrate.fn] != null) {
      constructor[dehydrate.fn].call(from, json);
    }

    constructor = Object.getPrototypeOf(constructor);
  }

  return json;
}

namespace dehydrate {
  export const fn = Symbol('[[rehydrate]]');
}

// ---------------------------------------------------------------------------------------------------------------------
// Export:
// ---------------------------------------------------------------------------------------------------------------------
export {rehydrate, dehydrate};
