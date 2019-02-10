// Copyright (C) 2019 | https://github.com/eth-p/SYSHACK-2019/
// ---------------------------------------------------------------------------------------------------------------------
import {rehydrate, dehydrate} from "./Hydration";

// Classes
class Base {
  public val1: string;
  constructor(val1: string) {
    this.val1 = val1;
  }

  public static [dehydrate.fn](this: Base, json: any) {
    json.val1 = '!' + this.val1;
  }

  public static [rehydrate.fn](this: Base, json: any) {
    this.val1 = json.val1.substring(1);
  }
}

class Sub extends Base {
  public val2: string;
  constructor(val1: string, val2: string) {
    super(val1);
    this.val2 = val2;
  }

  public static [dehydrate.fn](this: Sub, json: any) {
    json.val2 = '?!' + this.val2;
  }

  public static [rehydrate.fn](this: Sub, json: any) {
    this.val2 = json.val2.substring(2);
  }
}

// Dehydrate Tests
it('dehydrate', () => {
    let obj = new Sub("hello", "world");
    let json = dehydrate(obj, Base);

    expect(json).toEqual({
      '[[type]]': 'Sub',
      'val1': '!hello',
      'val2': '?!world'
    });
});

// Rehydrate Tests
it('rehydrate', () => {
  let obj = rehydrate({
    ['[[type]]']: 'Sub',
    val1: '!hello',
    val2: '?!world'
  }, Base, (x) => {
    if (x === 'Sub') return Sub;
    return Base;
  });

  expect(obj).toBeInstanceOf(Sub);
  expect(obj).toEqual({
    'val1': 'hello',
    'val2': 'world'
  });

});
