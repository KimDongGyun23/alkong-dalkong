export const setLocalStorageItem = (key: string, value: string | number) => {
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

export const setCurrentIdToStorage = (value: string | number) => {
  setLocalStorageItem('currentId', value)
}

export const getCurrentIdToStorage = () => {
  return getLocalStorageItem('currentId')
}

export const setFamilyCodeToStorage = (value: string) => {
  setLocalStorageItem('familyCode', value)
}

export const getFamilyCodeToStorage = () => {
  return getLocalStorageItem('familyCode')
}

export const setCurrentUsernameToStorage = (value: string) => {
  setLocalStorageItem('currentUsername', value)
}

export const getCurrentUsernameToStorage = () => {
  return getLocalStorageItem('currentUsername')
}

export const setLoginUsernameToStorage = (value: string) => {
  setLocalStorageItem('loginUsername', value)
}

export const getLoginUsernameToStorage = () => {
  return getLocalStorageItem('loginUsername')
}
