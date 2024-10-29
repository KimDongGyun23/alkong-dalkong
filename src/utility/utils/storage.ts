type UserData = {
  familyCode: string
  currentId: string | number
  userId: string | number
  currentUsername: string
  loginUsername: string
}

const STORAGE_KEY = 'user'

export const setUserDataToLocalStorage = (data: Partial<UserData>) => {
  if (typeof window !== 'undefined') {
    const existingData = getUserDataToLocalStorage()
    const updatedData = { ...existingData, ...data }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
  }
}

export const getUserDataToLocalStorage = (): UserData => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(STORAGE_KEY)
    return storedData ? JSON.parse(storedData) : {}
  }
  return {} as UserData
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
