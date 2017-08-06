const { wordParser } = require('./parser')

function of(str) {
  if (typeof str !== 'string') {
    throw new TypeError("Non-string passed.")
  }

  return ""
}

function to(end) {
  if ((typeof end !== 'number') || (end % 1 !== 0)) {
    throw new TypeError("Non-integer end index.")
  }

  const returnObj = {
    parameters: Object.assign({}, this.parameters, { end })
  }
  returnObj.of = of.bind(returnObj)

  return returnObj
}

function word(start) {
  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError("Non-integer start index.")
  }

  const returnObj = {
    parameters: {
      start,
      parser: wordParser
    }
  }
  returnObj.of = of.bind(returnObj)
  returnObj.to = to.bind(returnObj)

  return returnObj
}

module.exports = {
  word
}
