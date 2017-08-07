const wordConfig = {
  regex: (start, end) => new RegExp(`^((\\W*(\\w*'?\\w+)*){${start - 1}})(\\W+)?((\\W*(\\w*'?\\w+)*){${end - start + 1}})((\\W+)((\\W*(\\w*'?\\w+)*)*))?$`),
  extracter: (matches) => ({
    before: matches[1] || '',
    beforeSep: matches[4] || '',
    match: matches[5] || '',
    afterSep: matches[9] || '',
    after: matches[10] || ''
  }),
  separater: ' '
}

function wordParser(str, start, end) {
  if (typeof str !== 'string') {
    throw new TypeError("First parameter must be a string.")
  }

  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError("Non-integer start index.")
  }

  if (start < 1) {
    throw new RangeError('Start index must be > 0.')
  }

  if (end !== undefined && ((typeof end !== 'number') || (end % 1 !== 0))) {
    throw new TypeError("Non-integer end index.")
  }

  if (end !== undefined && end < start) {
    throw new RangeError('End index must be >= start.')
  }

  const { regex, extracter } = wordConfig
  const matches = regex(start, end || start).exec(str)
  if (matches) {
    return extracter(matches)
  }

  return {
    before: '',
    beforeSep: '',
    match: '',
    afterSep: '',
    after: ''
  }
}

module.exports = {
  wordParser
}