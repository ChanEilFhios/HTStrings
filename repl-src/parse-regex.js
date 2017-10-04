//const old = require('./initial_impl')
const str = `
Hello, World!
I'm Bob, World.

It's nice to meet you, I'd've said.
And here's line 4. It comes after 1, 2, and 3.
Line 5 is a nice line.`

const wordConfig = {
  regex: (start, end) => new RegExp(`^((\\W*(\\w*'?\\w*)*){${start - 1}})(\\W+)((\\W*(\\w*'?\\w*)*){${end - start + 1}})((\\W+)((\\W*(\\w*'?\\w*)*)*))?$`),
  extracter: (matches) => ({
    before: matches[1],
    beforeSep: matches[4],
    match: matches[5],
    afterSep: matches[9],
    after: matches[10]
  }),
  separater: ' '
}

const lineConfig = {
  regex: (start, end) => new RegExp(`^((([^\\r\\n]*)(\\r?\\n)?){${start - 1}})(\\r?\\n)(((\\r?\\n)?([^\\r\\n]*)){${end - start + 1}})(\\r?\\n)(((\\r?\\n)?([^\\r\\n]*))*)`),
  extracter: (matches) => ({
    before: matches[1],
    beforeSep: matches[5],
    match: matches[6],
    afterSep: matches[10],
    after: matches[11]
  }),
  separater: '\n'
}

const itemConfig = {
  regex: (start, end) => new RegExp(`^((([^,]*)(,)?){${start - 1}})(,)(((,)?([^,]*)){${end - start + 1}})(,)(((,)?([^,]*))*)`),
  extracter: (matches) => ({
    before: matches[1],
    beforeSep: matches[5],
    match: matches[6],
    afterSep: matches[10],
    after: matches[11]
  }),
  separater: ','
}

function parser(str, start, end, parserConfig = wordConfig) {
  const { regex, extracter, separater } = parserConfig
  const matches = regex(start, end || start).exec(str)
  return extracter(matches)
}

const get = (str, start, end, parserConfig = wordConfig) => parser(str, start, end, parserConfig).match
const into = (newStr, str, start, end, parserConfig = wordConfig) => {
  const parts = parser(str, start, end, parserConfig)

  return parts.before + parts.beforeSep + newStr + parts.afterSep + parts.after
}
const after = (newStr, str, start, end, parserConfig = wordConfig) => {
  const parts = parser(str, start, end, parserConfig)

  return parts.before + parts.beforeSep + parts.match + parserConfig.separater + newStr + parts.afterSep + parts.after
}
const before = (newStr, str, start, end, parserConfig = wordConfig) => {
  const parts = parser(str, start, end, parserConfig)

  return parts.before + parts.beforeSep + newStr + parserConfig.separater + parts.match + parts.afterSep + parts.after
}

//Words
console.log(parser(str, 3, 5))
console.log(get(str, 3))
console.log(into('oops', str, 3, 5))
console.log(after('oops', str, 3, 5))
console.log(before('oops', str, 3, 5))

//Lines
console.log(parser(str, 3, 5, lineConfig))
console.log(get(str, 3, 3, lineConfig))
console.log(into('oops', str, 3, 5, lineConfig))
console.log(after('oops', str, 3, 5, lineConfig))
console.log(before('oops', str, 3, 5, lineConfig))

//Items
console.log(parser(str, 3, 5, itemConfig))
console.log(get(str, 3, 3, itemConfig))
console.log(into('oops', str, 3, 5, itemConfig))
console.log(after('oops', str, 3, 5, itemConfig))
console.log(before('oops', str, 3, 5, itemConfig))
