export type AccountInfoResponse = {
  name: string
  phoneNumber: string
  birth: string
  gender: 'MAN' | 'WOMAN'
}

export type EditAccountInfoRequest = {
  name: string
  phoneNumber: string
  birth: string
  gender: 'MAN' | 'WOMAN'
}

export type PasswordEditFormType = {
  password: string
  confirm: string
  newPassword: string
}

export type EditPasswordRequest = Omit<PasswordEditFormType, 'confirm'>

export type CreateFamilyGroupResponse = {
  familyName: string
  familyCode: string
}

export type EnterFamilyGroupRequest = { familyCode: string }
