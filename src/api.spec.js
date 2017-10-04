const { word, del, put } = require('./api')
const { wordParser } = require('./parser')
const { get, remove, replace } = require('./actions')

describe('into', () => {
  let into

  beforeEach(() => {
    into = put('test').into
  })

  it('returns an object with a newStr parameter set previously by put', () => {
    expect(into()).toMatchObject({ parameters: { newStr: 'test' } })
  })

  it('returns an object with an action parameter set to the into action', () => {
    expect(typeof into().parameters.action).toBe('function')
  })

  it('returns an object with a property called word that is a function', () => {
    expect(typeof into().word).toBe('function')
  })

  it('replaces the indicated word', () => {
    expect(put('test').into().word(2).of('one two three')).toBe('one test three')
  })

  it('replaces a range of words', () => {
    expect(put('test').into().word(2).to(3).of('one two three four')).toBe('one test four')
  })

  it('replaces a range of words at the front', () => {
    expect(put('test').into().word(1).to(3).of('one two three four')).toBe('test four')
  })

  it('replaces a range of words at the end', () => {
    expect(put('test').into().word(2).to(4).of('one two three four')).toBe('one test')
  })
})

describe('before', () => {
  let before

  beforeEach(() => {
    before = put('test').before
  })

  it('returns an object with a newStr parameter set previously by put', () => {
    expect(before()).toMatchObject({ parameters: { newStr: 'test' } })
  })

  it('returns an object with an action parameter set to the before action', () => {
    expect(typeof before().parameters.action).toBe('function')
  })

  it('returns an object with a property called word that is a function', () => {
    expect(typeof before().word).toBe('function')
  })

  it('returns a new string with newStr added before the indicated word', () => {
    expect(put('test').before().word(2).of('one two three')).toBe('one test two three')
  })

  it('returns a new string with newStr added before a range of words', () => {
    expect(put('test').before().word(2).to(3).of('one two three four')).toBe('one test two three four')
  })

  it('returns a new string with newStr added before a range of words at the front', () => {
    expect(put('test').before().word(1).to(3).of('one two three four')).toBe('test one two three four')
  })

  it('returns a new string with newStr added before a range of words at the end', () => {
    expect(put('test').before().word(2).to(4).of('one two three four')).toBe('one test two three four')
  })
})

describe('after', () => {
  let after

  beforeEach(() => {
    after = put('test').after
  })

  it('returns an object with a newStr parameter set previously by put', () => {
    expect(after()).toMatchObject({ parameters: { newStr: 'test' } })
  })

  it('returns an object with an action parameter set to the before action', () => {
    expect(typeof after().parameters.action).toBe('function')
  })

  it('returns an object with a property called word that is a function', () => {
    expect(typeof after().word).toBe('function')
  })

  it('returns a new string with newStr added after the indicated word', () => {
    expect(put('test').after().word(2).of('one two three')).toBe('one two test three')
  })

  it('returns a new string with newStr added after a range of words', () => {
    expect(put('test').after().word(2).to(3).of('one two three four')).toBe('one two three test four')
  })

  it('returns a new string with newStr added after a range of words at the front', () => {
    expect(put('test').after().word(1).to(3).of('one two three four')).toBe('one two three test four')
  })

  it('returns a new string with newStr added after a range of words at the end', () => {
    expect(put('test').after().word(2).to(4).of('one two three four')).toBe('one two three four test')
  })
})

describe('put', () => {
  it('throws an error if no parameter', () => {
    const errorTester = () => put()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Must have a string to insert.')
  })

  it('returns an object with a newStr property set from the parameter', () => {
    expect(put('test')).toMatchObject({ parameters: { newStr: 'test' } })
  })

  it('returns an object with a property called into that is a function', () => {
    expect(typeof put('test').into).toBe('function')
  })

  it('returns an object with a property called after that is a function', () => {
    expect(typeof put('test').after).toBe('function')
  })

  it('returns an object with a property called before that is a function', () => {
    expect(typeof put('test').before).toBe('function')
  })

  it('returns an object without a property called to', () => {
    expect(put('test')).not.toHaveProperty('to')
  })

  it('returns an object without a property called of', () => {
    expect(put('test')).not.toHaveProperty('of')
  })

  it('returns an object without a property called word', () => {
    expect(put('test')).not.toHaveProperty('word')
  })
})

describe('del', () => {
  it('ignores parameters', () => {
    expect(() => del(1)).not.toThrow()
  })

  it('returns an object with a property word that is a function', () => {
    expect(typeof del().word).toBe('function')
  })

  it('returns an object with an action property set to remove', () => {
    expect(del()).toMatchObject({ parameters: { action: remove } })
  })

  it('word function returns an object with action property set to remove', () => {
    expect(del().word(4)).toMatchObject({ parameters: { action: remove } })
  })

  it('returns an object with a property called word that is a function', () => {
    expect(typeof del('test').word).toBe('function')
  })

  it('returns an object without a property called to', () => {
    expect(del('test')).not.toHaveProperty('to')
  })

  it('returns an object without a property called of', () => {
    expect(del('test')).not.toHaveProperty('of')
  })

  it('removes the indicated word', () => {
    expect(del().word(2).of('one two three four')).toBe('one three four')
  })

  it('removes the first word', () => {
    expect(del().word(1).of('one two three four')).toBe('two three four')
  })

  it('removes the last word', () => {
    expect(del().word(4).of('one two three four')).toBe('one two three')
  })

  it('removes a range of words', () => {
    expect(del().word(2).to(3).of('one two three four')).toBe('one four')
  })

  it('removes a range of words at the beginning', () => {
    expect(del().word(1).to(3).of('one two three four')).toBe('four')
  })

  it('removes a range of words at the end', () => {
    expect(del().word(2).to(4).of('one two three four')).toBe('one')
  })
})

describe('word', () => {
  it('throws an error if no parameter', () => {
    const errorTester = () => word()
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index.')
  })

  it('throws an error if string parameter', () => {
    const errorTester = () => word('')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index.')
  })

  it('throws an error if float parameter', () => {
    const errorTester = () => word(3.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer start index.')
  })

  it('throws an error if start parameter < 1', () => {
    const errorTester = () => word(0)
    expect(errorTester).toThrow(RangeError)
    expect(errorTester).toThrow('Start index must be > 0.')
  })

  it('returns an object with a start property set from the parameter', () => {
    expect(word(4)).toMatchObject({ parameters: { start: 4 } })
  })

  it('returns an object with parser set to wordParser', () => {
    expect(word(4)).toMatchObject({ parameters: { parser: wordParser } })
  })

  it('returns an object with an action property set to get', () => {
    expect(word(4)).toMatchObject({ parameters: { action: get } })
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
    expect(errorTester).toThrow('Non-integer end index.')
  })

  it('throws an error if non-numeric parameter', () => {
    const errorTester = () => to('')
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index.')
  })

  it('throws an error if float parameter', () => {
    const errorTester = () => to(3.5)
    expect(errorTester).toThrow(TypeError)
    expect(errorTester).toThrow('Non-integer end index.')
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
    expect(errorTester).toThrow('End must be >= start.')
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
      expect(errorTester).toThrow('Non-string passed.')
    }
  })

  it('throws an error if non-string parameter', () => {
    for (const ofFunc of ofFuncs) {
      const errorTester = () => ofFunc(3.5)
      expect(errorTester).toThrow(TypeError)
      expect(errorTester).toThrow('Non-string passed.')
    }
  })

  it('returns an empty string if empty string provided', () => {
    for (const ofFunc of ofFuncs) {
      expect(ofFunc('')).toBe('')
    }
  })
})

describe('word parsing', () => {
  it('can fetch a word in the middle of a string', () => {
    expect(word(2).of('one two three')).toBe('two')
  })

  it('can fetch the first word', () => {
    expect(word(1).of('one two three')).toBe('one')
  })

  it('can fetch the last word', () => {
    expect(word(3).of('one two three')).toBe('three')
  })

  it('can fetch the only word', () => {
    expect(word(1).of('one')).toBe('one')
  })

  it('can fetch a range of words', () => {
    expect(word(2).to(3).of('one two three four')).toBe('two three')
  })

  it('can fetch a range of words from the front', () => {
    expect(word(1).to(3).of('one two three four')).toBe('one two three')
  })

  it('can fetch a range of words from the back', () => {
    expect(word(2).to(4).of('one two three four')).toBe('two three four')
  })
})