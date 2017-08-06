const regex = /\W*(\w*)/gy;

function of(str) {
  return this.parser(str)
}

function to(end) {
  this.end = end
  return this
}

function withDelimiter(delimiter) {
  this.delim = delimiter
  return this
}

function charParser(str) {
  const { start, end } = this
  return str.slice(start - 1, end || start)
}

function lineParser(str) {
  this.delim = "\n"
  return itemParser.call(this, str)
}

function wordParser(str) {
  const { start, end } = this
  let m
  let returnVal = []
  let i = 1

  //Reset the index so we count from the beginning
  regex.lastIndex = 0

  //skip items until we reach start
  while ((m = regex.exec(str)) !== null && i < start) {
    i++
  }

  if (m) {
    returnVal.push(m[1])
  }

  while ((m = regex.exec(str)) !== null && m[0] !== '' && (end < 0 || (i < (end || start)))) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    //Switch to using the full match because we don't want to throw away the word break characters
    returnVal.push(m[0])
    i++
  }

  if (end < 0) {
    return returnVal.slice(0, end).join('')
  }

  return returnVal.join('')
}

function itemParser(str) {
  const { start, end, delim } = this
  return str.split(delim).slice(start - 1, end || start).join(delim)
}

function chunker(start, parser, initialItems = {}) {
  const obj = {
    start,
    delim: ','
  }
  obj.parser = parser.bind(obj)
  obj.of = of.bind(obj)
  obj.to = to.bind(obj)
  obj.withDelimiter = withDelimiter.bind(obj)

  return Object.assign(obj, initialItems)
}

function prepositioner(obj, preposition) {
  return Object.assign(obj, {
    preposition,
    char: (start) => chunker(start, charSetter, obj),
    line: (start) => chunker(start, lineSetter, obj),
    word: (start) => chunker(start, wordSetter, obj),
    item: (start) => chunker(start, itemSetter, obj)
  })
}

function deleter(obj) {
  return Object.assign(obj, {
    char: (start) => chunker(start, charDeleter, obj),
    line: (start) => chunker(start, lineDeleter, obj),
    word: (start) => chunker(start, wordDeleter, obj),
    item: (start) => chunker(start, itemDeleter, obj)
  })
}

const char = (start) => chunker(start, charParser)
const line = (start) => chunker(start, lineParser)
const word = (start) => chunker(start, wordParser)
const item = (start) => chunker(start, itemParser)

const put = (newStr) => {
  const obj = {
    newStr
  }
  obj.into = prepositioner(obj, 'into')
  obj.before = prepositioner(obj, 'before')
  obj.after = prepositioner(obj, 'after')

  return obj
}

const remove = () => {
  const obj = {
  }
  return deleter(obj)
}