const REQUEST_TIMEOUT_MS = 5_000

export async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!response.ok) {
      console.warn(`Request failed with status ${response.status}: ${url}`)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.warn(`Request failed: ${url}`, error)
    return null
  }
}
