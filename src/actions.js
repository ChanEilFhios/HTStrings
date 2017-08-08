function get(matches) {
  if (matches && matches.match) {
    return matches.match
  }

  return ''
}

module.exports = {
  get
}