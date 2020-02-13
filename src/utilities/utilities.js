export const isObjectEmpty = function(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const exists = function(object) {
  return object !== null && object !== undefined;
};

export const existsAndIsNotEmpty = function(object) {
  return exists(object) && !isObjectEmpty(object);
};

/**
 * @description Method for sleeping thread
 * @param {number} ms number of miliseconds for thread to sleep
 */

export const snooze = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * @description method for getting bit in given variable
 * @param {number} number variable
 * @param {number} bitPosition bit position
 */
export const getBit = function(number, bitPosition) {
  return (number & (1 << bitPosition)) === 0 ? false : true;
};

/**
 * @description method for setting bit in given variable
 * @param {number} number variable
 * @param {number} bitPosition bit position
 */
export const setBit = function(number, bitPosition) {
  return number | (1 << bitPosition);
};

/**
 * @description method for clearing bit in given variable
 * @param {number} number variable
 * @param {number} bitPosition bit position
 */
export const clearBit = function(number, bitPosition) {
  let mask = ~(1 << bitPosition);
  return number & mask;
};
