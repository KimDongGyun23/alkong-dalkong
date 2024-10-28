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

export type FamilyType = {
  familyCode: string
  familyName: string
  members: {
    name: string
    userId: number
  }[]
}

export type FamilySettingResponse = {
  families: FamilyType[]
}

export type EnterFamilyGroupRequest = { familyCode: string }
