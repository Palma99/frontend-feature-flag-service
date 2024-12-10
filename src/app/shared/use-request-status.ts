import { signal } from "@angular/core"



export const useRequestStatus = () => {
  const loading = signal<boolean>(false)
  const error = signal<string | null>(null)

  const init = () => {
    loading.set(false)
    error.set(null)
  }

  return {
    loading,
    error,
    init,
  }
}