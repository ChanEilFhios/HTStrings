const { get } = require('./actions.js')

const sample = {
  before: 'one',
  beforeSep: ' ',
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