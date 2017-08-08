const { word } = require('./api')
const { wordParser } = require('./parser')

describe('word', () => {
  it('throws an error if no parameter', () => {
    const errorTester = () => word()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index.")
  })

  it('throws an error if string parameter', () => {
    const errorTester = () => word("")
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index.")
  })

  it('throws an error if float parameter', () => {
    const errorTester = () => word(3.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer start index.")
  })

  it('throws an error if start parameter < 1', () => {
    const errorTester = () => word(0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow("Start index must be > 0.")
  })

  it('returns an object with a start property set from the parameter', () => {
    expect(word(4)).toMatchObject({ parameters: { start: 4 } })
  })

  it('returns an object with parser set to wordParser', () => {
    expect(word(4)).toMatchObject({ parameters: { parser: wordParser } })
  })

  it('returns an object with an of function', () => {
    expect(typeof word(4).of).toBe('function')
  })

  it('returns an object with a to function', () => {
    expect(typeof word(4).to).toBe('function')
  })
})

describe('to', () => {
  let to

  beforeEach(() => {
    to = word(4).to
  })

  it('throws an error if no parameter', () => {
    const errorTester = () => to()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer end index.")
  })

  it('throws an error if non-numeric parameter', () => {
    const errorTester = () => to("")
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer end index.")
  })

  it('throws an error if float parameter', () => {
    const errorTester = () => to(3.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow("Non-integer end index.")
  })

  it('returns an object with end property set to parameter value', () => {
    expect(to(5)).toMatchObject({ parameters: { end: 5 } })
  })

  it('returns an object with start property set to original value', () => {
    expect(to(5)).toMatchObject({ parameters: { start: 4 } })
  })

  it('throws an error if end < start', () => {
    const errorTester = () => to(3)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow("End must be >= start.")
  })

  it('returns an object with an of function', () => {
    expect(typeof to(5).of).toBe('function')
  })

  it('returns an object without a to function', () => {
    expect(to(5)).not.toHaveProperty('to')
  })
})

describe('of', () => {
  let ofFuncs

  beforeEach(() => {
    ofFuncs = []
    ofFuncs.push(word(4).of)
    ofFuncs.push(word(4).to(5).of)
  })

  it('throws an error if no parameter', () => {
    for (const ofFunc of ofFuncs) {
      const errorTester = () => ofFunc()
      expect(errorTester).toThrow(TypeError)
      expect(errorTester).toThrow("Non-string passed.")
    }
  })

  it('throws an error if non-string parameter', () => {
    for (const ofFunc of ofFuncs) {
      const errorTester = () => ofFunc(3.5)
      expect(errorTester).toThrow(TypeError)
      expect(errorTester).toThrow("Non-string passed.")
    }
  })

  it('returns an empty string if empty string provided', () => {
    for (const ofFunc of ofFuncs) {
      expect(ofFunc("")).toBe("")
    }
  })
})

describe('word parsing', () => {
  it('can fetch a word in the middle of a string', () => {
    expect(word(2).of('one two three')).toBe("two")
  })

  it('can fetch the first word', () => {
    expect(word(1).of('one two three')).toBe("one")
  })

  it('can fetch the last word', () => {
    expect(word(3).of('one two three')).toBe("three")
  })

  it('can fetch the only word', () => {
    expect(word(1).of('one')).toBe("one")
  })

  it('can fetch a range of words', () => {
    expect(word(2).to(3).of('one two three four')).toBe("two three")
  })

  it('can fetch a range of words from the front', () => {
    expect(word(1).to(3).of('one two three four')).toBe("one two three")
  })

  it('can fetch a range of words from the back', () => {
    expect(word(2).to(4).of('one two three four')).toBe("two three four")
  })
})