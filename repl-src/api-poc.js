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

function charSetter(str) {
  return str
}

function lineSetter(str) {
  return str
}

function wordSetter(str) {
  return str
}

function itemSetter(str) {
  return str
}

function charDeleter(str) {
  return str
}

function lineDeleter(str) {
  return str
}

function wordDeleter(str) {
  return str
}

function itemDeleter(str) {
  return str
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

//Unit Tests
console.log('char(2).of("abc")', char(2).of("abc"))
console.log('char(2).to(3).of("abcd")', char(2).to(3).of("abcd"))
console.log('line(2).of("abc\\ndef\\nghi")', line(2).of("abc\ndef\nghi"))
console.log('line(2).to(3).of("abc\\ndef\\nghi")', line(2).to(3).of("abc\ndef\nghi"))
console.log('char(1).to(2).of(line(3).of("abc\ndef\nghi"))', char(1).to(2).of(line(3).of("abc\ndef\nghi")))
console.log('item(4).of("a,b,c,d,e,f,g")', item(4).of("a,b,c,d,e,f,g"))
console.log('item(4).withDelimiter(".").of("a.b.c.d.e.f.g")', item(4).withDelimiter(".").of("a.b.c.d.e.f.g"))
console.log('item(4).to(5).of("a,b,c,d,e,f,g")', item(4).to(5).of("a,b,c,d,e,f,g"))
console.log('item(4).to(-1).of("a,b,c,d,e,f,g")', item(4).to(-1).of("a,b,c,d,e,f,g"))
console.log('char(2).of(item(4).to(5).of("a,b,c,d,e,f,g"))', char(2).of(item(4).to(5).of("a,b,c,d,e,f,g")))
console.log('word(2).of("Hello, World. I love you!")', word(2).of("Hello, World. I love you!"))
console.log('word(2).to(4).of("Hello, World. I love you!")', word(2).to(4).of("Hello, World. I love you!"))
console.log('word(2).to(4).of("Hello, World. I love you!")', word(2).to(-1).of("Hello, World. I love you!"))
console.log('put("World").into.word(2).of("Hello, Bob!")', put("World").into.word(2).of("Hello, Bob!"))



