function wordParser(str, start) {
  if (typeof str !== 'string') {
    throw new TypeError("First parameter must be a string.")
  }

  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError("Non-integer start index.")
  }
}

module.exports = {
  wordParser
}