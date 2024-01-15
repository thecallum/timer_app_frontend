const useLocalStorage = <T>(localStorageKey: string) => {
  const updateLocalStorageValue = (value: T) => {
    const jsonValue = JSON.stringify(value)

    window.localStorage.setItem(localStorageKey, jsonValue)
  }

  const getLocalStorageValue = (): T | null => {
    const jsonValue = window.localStorage.getItem(localStorageKey)

    if (jsonValue === null || jsonValue === undefined) return null

    try {
      const obj: T = JSON.parse(jsonValue)
      return obj
    } catch (error) {
      console.error('Failed to deserialize localStorage value', error)
      return null
    }
  }

  const clearLocalStorageValue = () => {
    window.localStorage.removeItem(localStorageKey)
  }

  return {
    updateLocalStorageValue,
    getLocalStorageValue,
    clearLocalStorageValue,
  }
}

export default useLocalStorage
