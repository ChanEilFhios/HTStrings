const { wordParser, lineParser } = require('./parser')
const { get, remove, replace, putBefore, putAfter } = require('./actions')

function addFunctions(obj) {
  if (obj.parameters.newStr === undefined || obj.parameters.action !== undefined) {
    if (obj.parameters.action !== remove || obj.parameters.start !== undefined) {
      obj.of = of.bind(obj)

      if (obj.parameters.end === undefined) {
        obj.to = to.bind(obj)
      }
    }

    if (obj.parameters.action !== get && obj.parameters.start === undefined) {
      obj.word = word.bind(obj)
    }
  }

  if (obj.parameters.newStr !== undefined) {
    obj.into = into.bind(obj)
    obj.before = before.bind(obj)
    obj.after = after.bind(obj)
  }

  return obj
}

function into() {
  return addFunctions({
    parameters: Object.assign({}, this.parameters, { action: (a) => replace(this.parameters.newStr, a) })
  })
}

function before() {
  return addFunctions({
    parameters: Object.assign({}, this.parameters, { action: (a) => putBefore(this.parameters.newStr, a) })
  })
}

function after() {
  return addFunctions({
    parameters: Object.assign({}, this.parameters, { action: (a) => putAfter(this.parameters.newStr, a) })
  })
}

function of(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Non-string passed.')
  }

  return this.parameters.action(this.parameters.parser(str, this.parameters.start, this.parameters.end))
}

function to(end) {
  if ((typeof end !== 'number') || (end % 1 !== 0)) {
    throw new TypeError('Non-integer end index.')
  } else if (end < this.parameters.start) {
    throw new RangeError('End must be >= start.')
  }

  return addFunctions({
    parameters: Object.assign({}, this.parameters, { end })
  })
}

const del = () => addFunctions({ parameters: { action: remove } })

function put(str) {
  if (str === undefined) {
    throw new TypeError('Must have a string to insert.')
  }

  return addFunctions({
    parameters: {
      newStr: str
    }
  })
}

function word(start) {
  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError('Non-integer start index.')
  } else if (start < 1) {
    throw new RangeError('Start index must be > 0.')
  }

  //Calculate the proper parameters based on existing state. NEVER override action
  const parameters = Object.assign({}, { action: get }, this.parameters || {}, { start, parser: wordParser })

  return addFunctions({
    parameters
  })
}

function line(start) {
  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError('Non-integer start index.')
  } else if (start < 1) {
    throw new RangeError('Start index must be > 0.')
  }

  //Calculate the proper parameters based on existing state. NEVER override action
  const parameters = Object.assign({}, { action: get }, this.parameters || {}, { start, parser: lineParser })

  return addFunctions({
    parameters
  })
}

module.exports = {
  word,
  line,
  del,
  put
}
