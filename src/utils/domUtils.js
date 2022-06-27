export function getUniqueId(prefix = 'holo-id') {
  let i = 1

  while (document.querySelector(`#${prefix}${i}`)) {
    i += 1
  }

  return `${prefix}${i}`
}

export function focusElement(idOrElement) {
  // Note: nextTick() doesn't work
  let element

  if (typeof idOrElement === 'string') {
    element = document.getElementById(idOrElement)
  } else {
    element = idOrElement
  }

  setTimeout(() => element?.focus(), 0)
}
