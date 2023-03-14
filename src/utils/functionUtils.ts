async function retry(fn: () => unknown, maxAttempts: number): Promise<unknown> {
  const execute = async (attempt: number): Promise<unknown> => {
    try {
      return fn()
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
