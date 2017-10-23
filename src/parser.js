const escapeStringRegexp = require('escape-string-regexp')

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

const lineConfig = {
  regex: (start, end) => new RegExp(`^(((\\r?\\n)*([^\\r\\n]+)*){${start - 1}})((\\r?\\n)+)?(((\\r?\\n)*([^\\r\\n]+)*){${end - start + 1}})(((\\r?\\n)+)(((\\r?\\n)*([^\\r\\n]+)*)*))?$`),
  extracter: (matches) => ({
    before: matches[1] || '',
    beforeSep: matches[5] || '',
    match: matches[7] || '',
    afterSep: matches[12] || '',
    after: matches[14] || ''
  }),
  separater: '\n'
}

const itemConfig = {
  regex: (start, end, delim = ',') => {
    const delimiter = escapeStringRegexp(delim)
    return new RegExp(`^(((${delimiter})*([^${delimiter}]+)*){${start - 1}})((${delimiter})+)?(((${delimiter})*([^${delimiter}]+)*){${end - start + 1}})(((${delimiter})+)(((${delimiter})*([^${delimiter}]+)*)*))?$`)
  },
  extracter: (matches) => ({
    before: matches[1] || '',
    beforeSep: matches[5] || '',
    match: matches[7] || '',
    afterSep: matches[12] || '',
    after: matches[14] || ''
  }),
  separater: '\n'
}

const getParser = (parseConfig) => (str, start, end, delim) => {
  if (typeof str !== 'string') {
    throw new TypeError('First parameter must be a string.')
  }

  if ((typeof start !== 'number') || (start % 1 !== 0)) {
    throw new TypeError('Non-integer start index.')
  }

  if (start < 1) {
    throw new RangeError('Start index must be > 0.')
  }

  if (end !== undefined && ((typeof end !== 'number') || (end % 1 !== 0))) {
    throw new TypeError('Non-integer end index.')
  }

  if (end !== undefined && end < start) {
    throw new RangeError('End index must be >= start.')
  }

  const { regex, extracter } = parseConfig
  const matches = regex(start, end || start, delim).exec(str)
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
  wordParser: getParser(wordConfig),
  lineParser: getParser(lineConfig),
  itemParser: getParser(itemConfig)
}