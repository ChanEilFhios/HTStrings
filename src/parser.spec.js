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

})