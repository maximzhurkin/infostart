const clickOutside = (target, callback) => {
  const handler = (e) => {
    if (!target.contains(e.target)) {
      callback()
      removeListener()
    }
  }
  const removeListener = () => document.removeEventListener('click', handler)

  document.addEventListener('click', handler)
}

export default clickOutside
