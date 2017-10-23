const { lineParser, wordParser, itemParser } = require('./parser')

describe('wordParser', () => {
  it('throws an error if no parameters', () => {
    const errorTester = () => wordParser()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string.')
  })

  it('throws an error if first parameter is not a string', () => {
    const errorTester = () => wordParser(1)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string')
  })

  it('throws an error if no start index', () => {
    const errorTester = () => wordParser('')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric start index', () => {
    const errorTester = () => wordParser('', '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if float start index', () => {
    const errorTester = () => wordParser('', 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric end index', () => {
    const errorTester = () => wordParser('', 1, '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if float end index', () => {
    const errorTester = () => wordParser('', 1, 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if start index < 1', () => {
    const errorTester = () => wordParser('', 0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow('Start index must be > 0.')
  })

  it('returns an object of the correct shape', () => {
    expect(wordParser('', 1)).toMatchObject({ before: '', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('returns the requested word in the match property with only 1 word in string', () => {
    expect(wordParser('testing', 1)).toMatchObject({ before: '', beforeSep: '', match: 'testing', afterSep: '', after: '' })
  })

  it('returns the correct values in all properties', () => {
    expect(wordParser('one two three', 2)).toMatchObject({ before: 'one', beforeSep: ' ', match: 'two', afterSep: ' ', after: 'three' })
  })

  it('can match the first word', () => {
    expect(wordParser('one two three', 1)).toMatchObject({ before: '', beforeSep: '', match: 'one', afterSep: ' ', after: 'two three' })
  })

  it('can match the last word', () => {
    expect(wordParser('one two three', 3)).toMatchObject({ before: 'one two', beforeSep: ' ', match: 'three', afterSep: '', after: '' })
  })

  it('matches beyond the end', () => {
    expect(wordParser('one two three', 4)).toMatchObject({ before: 'one two three', beforeSep: '', match: '', afterSep: '', after: '' })
    expect(wordParser('one two three', 5)).toMatchObject({ before: 'one two three', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('matches a range of words', () => {
    expect(wordParser('one two three four', 2, 3)).toMatchObject({ before: 'one', beforeSep: ' ', match: 'two three', afterSep: ' ', after: 'four' })
  })

  it('matches a range of words at the beginning', () => {
    expect(wordParser('one two three four', 1, 3)).toMatchObject({ before: '', beforeSep: '', match: 'one two three', afterSep: ' ', after: 'four' })
  })

  it('matches a range of words at the end', () => {
    expect(wordParser('one two three four', 2, 4)).toMatchObject({ before: 'one', beforeSep: ' ', match: 'two three four', afterSep: '', after: '' })
  })

  it('matches the full range of words', () => {
    expect(wordParser('one two three four', 1, 4)).toMatchObject({ before: '', beforeSep: '', match: 'one two three four', afterSep: '', after: '' })
  })

  it('matches a range of words that is too long', () => {
    expect(wordParser('one two three four', 1, 5)).toMatchObject({ before: '', beforeSep: '', match: 'one two three four', afterSep: '', after: '' })
  })

  it('preserves spacing between words', () => {
    expect(wordParser('one  two  three  four', 2, 3)).toMatchObject({ before: 'one', beforeSep: '  ', match: 'two  three', afterSep: '  ', after: 'four' })
  })

  it('breaks on punctuation', () => {
    expect(wordParser('one.two;three,four', 2, 3)).toMatchObject({ before: 'one', beforeSep: '.', match: 'two;three', afterSep: ',', after: 'four' })
  })

  it('breaks on quotes', () => {
    expect(wordParser('one \'two three\' four', 2, 3)).toMatchObject({ before: 'one', beforeSep: ' \'', match: 'two three', afterSep: '\' ', after: 'four' })
  })

  it('handles contractions', () => {
    expect(wordParser('I\'d\'ve can\'t didn\'t', 2)).toMatchObject({ before: 'I\'d\'ve', beforeSep: ' ', match: 'can\'t', afterSep: ' ', after: 'didn\'t' })
  })
})

describe('lineParser', () => {
  it('throws an error if no parameters', () => {
    const errorTester = () => lineParser()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string.')
  })

  it('throws an error if first parameter is not a string', () => {
    const errorTester = () => lineParser(1)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string')
  })

  it('throws an error if no start index', () => {
    const errorTester = () => lineParser('')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric start index', () => {
    const errorTester = () => lineParser('', '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if float start index', () => {
    const errorTester = () => lineParser('', 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric end index', () => {
    const errorTester = () => lineParser('', 1, '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if float end index', () => {
    const errorTester = () => lineParser('', 1, 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if start index < 1', () => {
    const errorTester = () => lineParser('', 0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow('Start index must be > 0.')
  })

  it('returns an object of the correct shape', () => {
    expect(lineParser('', 1)).toMatchObject({ before: '', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('returns the requested line in the match property with only 1 line in string', () => {
    expect(lineParser('testing', 1)).toMatchObject({ before: '', beforeSep: '', match: 'testing', afterSep: '', after: '' })
  })

  it('returns the correct values in all properties', () => {
    expect(lineParser('one\ntwo\nthree', 2)).toMatchObject({ before: 'one', beforeSep: '\n', match: 'two', afterSep: '\n', after: 'three' })
  })

  it('can match the first line', () => {
    expect(lineParser('one\ntwo\nthree', 1)).toMatchObject({ before: '', beforeSep: '', match: 'one', afterSep: '\n', after: 'two\nthree' })
  })

  it('can match the last line', () => {
    expect(lineParser('one\ntwo\nthree', 3)).toMatchObject({ before: 'one\ntwo', beforeSep: '\n', match: 'three', afterSep: '', after: '' })
  })

  it('matches beyond the end', () => {
    expect(lineParser('one\ntwo\nthree', 4)).toMatchObject({ before: 'one\ntwo\nthree', beforeSep: '', match: '', afterSep: '', after: '' })
    expect(lineParser('one\ntwo\nthree', 5)).toMatchObject({ before: 'one\ntwo\nthree', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('matches a range of lines', () => {
    expect(lineParser('one\ntwo\nthree\nfour', 2, 3)).toMatchObject({ before: 'one', beforeSep: '\n', match: 'two\nthree', afterSep: '\n', after: 'four' })
  })

  it('matches a range of lines at the beginning', () => {
    expect(lineParser('one\ntwo\nthree\nfour', 1, 3)).toMatchObject({ before: '', beforeSep: '', match: 'one\ntwo\nthree', afterSep: '\n', after: 'four' })
  })

  it('matches a range of lines at the end', () => {
    expect(lineParser('one\ntwo\nthree\nfour', 2, 4)).toMatchObject({ before: 'one', beforeSep: '\n', match: 'two\nthree\nfour', afterSep: '', after: '' })
  })

  it('matches the full range of lines', () => {
    expect(lineParser('one\ntwo\nthree\nfour', 1, 4)).toMatchObject({ before: '', beforeSep: '', match: 'one\ntwo\nthree\nfour', afterSep: '', after: '' })
  })

  it('matches a range of lines that is too long', () => {
    expect(lineParser('one\ntwo\nthree\nfour', 1, 5)).toMatchObject({ before: '', beforeSep: '', match: 'one\ntwo\nthree\nfour', afterSep: '', after: '' })
  })

  it('matches when using a \\r\\n style line-break', () => {
    expect(lineParser('one\r\ntwo\r\nthree\r\nfour', 2, 3)).toMatchObject({ before: 'one', beforeSep: '\r\n', match: 'two\r\nthree', afterSep: '\r\n', after: 'four' })
  })
})

describe('itemParser', () => {
  it('throws an error if no parameters', () => {
    const errorTester = () => itemParser()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string.')
  })

  it('throws an error if first parameter is not a string', () => {
    const errorTester = () => itemParser(1)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('First parameter must be a string')
  })

  it('throws an error if no start index', () => {
    const errorTester = () => itemParser('')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric start index', () => {
    const errorTester = () => itemParser('', '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if float start index', () => {
    const errorTester = () => itemParser('', 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index')
  })

  it('throws an error if non-numeric end index', () => {
    const errorTester = () => itemParser('', 1, '')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if float end index', () => {
    const errorTester = () => itemParser('', 1, 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index')
  })

  it('throws an error if start index < 1', () => {
    const errorTester = () => itemParser('', 0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow('Start index must be > 0.')
  })

  it('returns an object of the correct shape', () => {
    expect(itemParser('', 1)).toMatchObject({ before: '', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('returns the requested item in the match property with only 1 item in string', () => {
    expect(itemParser('testing', 1)).toMatchObject({ before: '', beforeSep: '', match: 'testing', afterSep: '', after: '' })
  })

  it('returns the correct values in all properties', () => {
    expect(itemParser('one,two,three', 2)).toMatchObject({ before: 'one', beforeSep: ',', match: 'two', afterSep: ',', after: 'three' })
  })

  it('can match the first item', () => {
    expect(itemParser('one,two,three', 1)).toMatchObject({ before: '', beforeSep: '', match: 'one', afterSep: ',', after: 'two,three' })
  })

  it('can match the last item', () => {
    expect(itemParser('one,two,three', 3)).toMatchObject({ before: 'one,two', beforeSep: ',', match: 'three', afterSep: '', after: '' })
  })

  it('matches beyond the end', () => {
    expect(itemParser('one,two,three', 4)).toMatchObject({ before: 'one,two,three', beforeSep: '', match: '', afterSep: '', after: '' })
    expect(itemParser('one,two,three', 5)).toMatchObject({ before: 'one,two,three', beforeSep: '', match: '', afterSep: '', after: '' })
  })

  it('matches a range of items', () => {
    expect(itemParser('one,two,three,four', 2, 3)).toMatchObject({ before: 'one', beforeSep: ',', match: 'two,three', afterSep: ',', after: 'four' })
  })

  it('matches a range of items at the beginning', () => {
    expect(itemParser('one,two,three,four', 1, 3)).toMatchObject({ before: '', beforeSep: '', match: 'one,two,three', afterSep: ',', after: 'four' })
  })

  it('matches a range of items at the end', () => {
    expect(itemParser('one,two,three,four', 2, 4)).toMatchObject({ before: 'one', beforeSep: ',', match: 'two,three,four', afterSep: '', after: '' })
  })

  it('matches the full range of items', () => {
    expect(itemParser('one,two,three,four', 1, 4)).toMatchObject({ before: '', beforeSep: '', match: 'one,two,three,four', afterSep: '', after: '' })
  })

  it('matches a range of items that is too long', () => {
    expect(itemParser('one,two,three,four', 1, 5)).toMatchObject({ before: '', beforeSep: '', match: 'one,two,three,four', afterSep: '', after: '' })
  })

  it('matches an item using a non-default delimiter', () => {
    expect(itemParser('one_two_three_four', 2, 3, '_')).toMatchObject({ before: 'one', beforeSep: '_', match: 'two_three', afterSep: '_', after: 'four' })
  })

  it('matches an item using a delimiter that is a special character to regex', () => {
    expect(itemParser('one+two+three+four', 2, 3, '+')).toMatchObject({ before: 'one', beforeSep: '+', match: 'two+three', afterSep: '+', after: 'four' })
  })
})