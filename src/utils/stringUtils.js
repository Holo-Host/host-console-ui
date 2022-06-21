export function capitalizeWord(word) {
  if (!word) {
    return ''
  }

  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}
