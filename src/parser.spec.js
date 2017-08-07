const { wordParser } = require('./parser')

describe('wordParser', () => {
  it('throws an error if no parameters', () => {
    const errorTester = () => wordParser()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("First parameter must be a string.")
  })

  it('throws an error if first parameter is not a string', () => {
    const errorTester = () => wordParser(1)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("First parameter must be a string")
  })

  it('throws an error if no start index', () => {
    const errorTester = () => wordParser("")
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index")
  })

  it('throws an error if non-numeric start index', () => {
    const errorTester = () => wordParser("", "")
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index")
  })

  it('throws an error if float start index', () => {
    const errorTester = () => wordParser("", 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index")
  })

  it('throws an error if non-numeric end index', () => {
    const errorTester = () => wordParser("", 1, "")
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer end index")
  })

  it('throws an error if float end index', () => {
    const errorTester = () => wordParser("", 1, 7.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer end index")
  })

  it('throws an error if start index < 1', () => {
    const errorTester = () => wordParser("", 0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow("Start index must be > 0.")
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

  it('matches a range of words at the begi nning', () => {
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