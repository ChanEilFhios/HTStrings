const { wordParser } = require('./parser')
const { get, remove } = require('./actions')

function of(str) {
  if (typeof str !== 'string') {
    throw new TypeError("Non-string passed.")
  }

  return this.parameters.action(this.parameters.parser(str, this.parameters.start, this.parameters.end))
}

function to(end) {
  if ((typeof end !== 'number') || (end % 1 !== 0)) {
    throw new TypeError("Non-integer end index.")
  } else if (end < this.parameters.start) {
    throw new RangeError("End must be >= start.")
  }

  const returnObj = {
    parameters: Object.assign({}, this.parameters, { end })
  }
  returnObj.of = of.bind(returnObj)

  return returnObj
}

function del() {
  const returnObj = {
    parameters: {
      action: remove
    }
  }
  returnObj.word = word.bind(returnObj)

  return returnObj
}

function word(start) {
  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError("Non-integer start index.")
  } else if (start < 1) {
    throw new RangeError("Start index must be > 0.")
  }

  //Calculate the proper parameters based on existing state
  const parameters = Object.assign({}, {action: get}, this.parameters || {}, {start, parser: wordParser})

  const returnObj = {
    parameters
  }
  returnObj.of = of.bind(returnObj)
  returnObj.to = to.bind(returnObj)

  return returnObj
}

module.exports = {
  word,
  del
}
