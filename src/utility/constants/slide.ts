export const HOURS = Object.freeze(Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')))
export const MINUTES = Object.freeze(
  Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
)

export const WEIGHT_NUMBERS = Object.freeze(Array.from({ length: 10 }, (_, i) => String(i)))
