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
