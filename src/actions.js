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

function replace(newStr, matches) {
  if (newStr === undefined) {
    return ''
  }
  if (matches) {
    return matches.before + matches.beforeSep + newStr + matches.afterSep + matches.after
  }

  return newStr
}

function putBefore(newStr, matches) {
  if (newStr === undefined) {
    return ''
  }
  if (matches) {
    return matches.before + matches.beforeSep + newStr + ' ' + matches.match + matches.afterSep + matches.after
  }

  return newStr
}

function putAfter(newStr, matches) {
  if (newStr === undefined) {
    return ''
  }
  if (matches) {
    return matches.before + matches.beforeSep + matches.match + ' ' + newStr + matches.afterSep + matches.after
  }

  return newStr
}

module.exports = {
  get,
  remove,
  replace,
  putBefore,
  putAfter
}