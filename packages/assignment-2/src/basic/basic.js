export function shallowEquals(target1, target2) {
  // (null, null)
  if (target1 === null && target2 === null) return true;

  // (1, 1)
  // ('abc', 'abc')
  // (undefined, undefined)
  if (typeof target1 !== 'object') return target1 === target2;

  // (new Number(1), new Number(1))
  // (new String(1), new String(1))
  // (new (class{})(), new (class{})())
  if (
    target1.constructor.name !== 'Object' &&
    target1.constructor.name !== 'Array'
  ) {
    return Object.is(target1, target2);
  }

  const keys1 = Object.keys(target1);
  const keys2 = Object.keys(target2);

  // ([1, 2], [1, 2, 3])
  if (keys1.length !== keys2.length) return false;

  // ([1, 2, 3, [4]], [1, 2, 3, [4]])
  // ( [1, 2, 3, { foo: 1 }], [1, 2, 3, { foo: 1 }])
  // ({a: 1}, {a: 2})
  // ({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})
  for (let key of keys1) {
    if (
      !Object.hasOwnProperty.call(target2, key) ||
      target1[key] !== target2[key]
    ) {
      return false;
    }
  }

  // ({}, {})
  // ([], [])
  // ([1, 2, 3], [1, 2, 3])
  // ({a: 1}, {a: 1})
  return true;
}

export function deepEquals(target1, target2) {
  // shallowEquals가 비슷하되, target의 child element들의 비교가 필요
  // target의 child element들까지 shallowEquals로 true면 true
  // 재귀 형식으로 계속 들어가기

  if (shallowEquals(target1, target2)) return true;

  if (typeof target1 !== 'object') return target1 === target2;

  if (
    target1.constructor.name !== 'Object' &&
    target1.constructor.name !== 'Array'
  ) {
    return Object.is(target1, target2);
  }

  const keys1 = Object.keys(target1);
  const keys2 = Object.keys(target2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (
      !Object.hasOwnProperty.call(target2, key) ||
      !deepEquals(target1[key], target2[key])
    ) {
      return false;
    }
  }

  return true;
}

export function createNumber1(n) {
  return n;
}

export function createNumber2(n) {
  return n;
}

export function createNumber3(n) {
  return n;
}

export class CustomNumber {

}

export function createUnenumerableObject(target) {
  return target;
}

export function forEach(target, callback) {

}

export function map(target, callback) {

}

export function filter(target, callback) {

}


export function every(target, callback) {

}

export function some(target, callback) {

}



