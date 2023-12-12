/**
 * Prompts user to save a CSV file locally. Is hacky, but apparently everyone uses the
 * same basic hack if you want to generate client-side.
 * @param fileName Name to save to
 * @param csvContent Content to put in the file.
 */
export const saveCsvToClient = (fileName: string, csvContent: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const anchor = document.createElement('a')
  anchor.download = fileName
  anchor.href = window.URL.createObjectURL(blob)
  anchor.click()
}
