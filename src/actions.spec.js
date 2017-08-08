const { get, remove } = require('./actions.js')

const sample = {
  before: 'one',
  beforeSep: ',',
  match: 'two',
  afterSep: ' ',
  after: 'three'
}

describe('get', () => {
  it('retrieves the match', () => {
    expect(get(sample)).toBe('two')
  })

  it('returns an empty string if no match property', () => {
    expect(get({})).toBe('')
  })

  it('returns an empty string if no parameter', () => {
    expect(get()).toBe('')
  })
})

describe('remove', () => {
  it('retrieves everything except match and beforeSep', () => {
    expect(remove(sample)).toBe('one three')
  })

  it('returns an empty string if no match property', () => {
    expect(remove({})).toBe('')
  })

  it('returns an empty string if no parameter', () => {
    expect(remove()).toBe('')
  })

  it('handles empty before', () => {
    expect(remove({before:'', beforeSep:'', match:'one', afterSep:' ', after:'two'})).toBe('two')
  })
})