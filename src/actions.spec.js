const { get, remove, replace } = require('./actions.js')

const sample = {
  before: 'one',
  beforeSep: ',',
  match: 'two',
  afterSep: ' ',
  after: 'three'
}

describe('replace', () => {
  it('returns the new string if no matches parameters', () => {
    expect(replace('test')).toBe('test')
  })

  it('returns an empty string if no parameters', () => {
    expect(replace()).toBe('')
  })

  it('returns a new string replacing match with newStr', () => {
    expect(replace('test', sample)).toBe('one,test three')
  })

  it('returns a new string replacing match with newStr with empty before', () => {
    expect(replace('test', { before: '', beforeSep: '', match: 'one', afterSep: ' ', after: 'two' })).toBe('test two')
  })

  it('returns a new string replacing match with newStr with empty after', () => {
    expect(replace('test', { before: 'one', beforeSep: ' ', match: 'two', afterSep: '', after: '' })).toBe('one test')
  })
})

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
    expect(remove({ before: '', beforeSep: '', match: 'one', afterSep: ' ', after: 'two' })).toBe('two')
  })

  it('handles empty after', () => {
    expect(remove({ before: 'one', beforeSep: '', match: 'two', afterSep: '', after: '' })).toBe('one')
  })
})