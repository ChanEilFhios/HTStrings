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