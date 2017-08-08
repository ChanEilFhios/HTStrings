const { wordParser } = require('./parser')
const { get, remove } = require('./actions')

function addFunctions(obj) {
  obj.of = of.bind(obj)

  if (obj.parameters.end === undefined) {
    obj.to = to.bind(obj)
  }

  if (obj.parameters.action !== get && obj.parameters.start === undefined) {
    obj.word = word.bind(obj)
  }

  return obj
}

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

  return addFunctions({
    parameters: Object.assign({}, this.parameters, { end })
  })
}

const del = () => addFunctions({ parameters: { action: remove } })

function word(start) {
  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError("Non-integer start index.")
  } else if (start < 1) {
    throw new RangeError("Start index must be > 0.")
  }

  //Calculate the proper parameters based on existing state
  const parameters = Object.assign({}, { action: get }, this.parameters || {}, { start, parser: wordParser })

  return addFunctions({
    parameters
  })
}

module.exports = {
  word,
  del
}
