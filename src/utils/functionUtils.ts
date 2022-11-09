function retry(fn, maxAttempts) {
  const execute = async (attempt) => {
    try {
      return await fn()
    } catch (err) {
      if (attempt <= maxAttempts) {
        const nextAttempt = attempt + 1
        return execute(nextAttempt)
      } else {
        throw err
      }
    }
  }

  return execute(1)
}

export { retry }
