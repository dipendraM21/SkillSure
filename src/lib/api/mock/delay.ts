export function withMockLatency<T>(data: T, ms = 280): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), ms)
  })
}
