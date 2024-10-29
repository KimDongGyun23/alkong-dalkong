export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : null
  }
  return null
}

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear()
  }
}

export const setCurrentIdToStorage = (value: string) => {
  setLocalStorageItem('currentId', value)
}

export const getCurrentIdToStorage = () => {
  return getLocalStorageItem('currentId')
}
