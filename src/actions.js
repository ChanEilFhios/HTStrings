function get(matches) {
  if (matches && matches.match) {
    return matches.match
  }

  return ''
}

function remove(matches) {
  if (matches) {
    if (matches.before && !matches.after) {
      return matches.before
    }
    if (matches.after && !matches.before) {
      return matches.after
    }
    if (matches.before && matches.after) {
      return matches.before + matches.afterSep + matches.after
    }
  }

  return ''
}

module.exports = {
  get,
  remove
}