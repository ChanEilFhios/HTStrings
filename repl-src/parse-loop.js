const wordConfig = {
  regex: /\W*(\w*)/gy,
  separater: ' '
}

const lineConfig = {
  regex: /\n*([^\n]*)/gy,
  separater: '\n'
}

const itemConfig = {
  regex: /,*([^,]*)/gy,
  separater: ','
}

function parser(str, start, end, parserConfig = wordConfig) {
  const { regex, separater } = parserConfig
  let m
  let matches = []
  let i = 1

  //Reset the index so we count from the beginning
  regex.lastIndex = 0

  while ((m = regex.exec(str)) !== null && m[0] !== '') {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    //Switch to using the full match because we don't want to throw away the word break characters
    matches.push(m[0])
    i++
  }

  return {
    before: matches.slice(0, start - 1).join(''),
    match: matches.slice(start - 1, end || start).join(''),
    after: matches.slice(end || start).join('')
  }
}

console.log(parser('Hello, World!\nHow are you today?', 2))