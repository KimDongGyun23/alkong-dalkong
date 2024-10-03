export const TIME_SLIDER_HOURS = Object.freeze(
  Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
)
export const TIME_SLIDER_MINUTES = Object.freeze(
  Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
)

export const WEIGHT_SLIDER_NUMBERS = Object.freeze(Array.from({ length: 10 }, (_, i) => String(i)))

export const personal = `개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n\n\n\n\n개인정보이용 동의할텨?\n\n\n\n`
export const notification = `알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n\n\n\n\n알림 수신 동의할텨?\n\n\n\n`
export const tos = { personal, notification }
