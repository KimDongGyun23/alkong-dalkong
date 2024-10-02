type ParseDosageType = (dosage: string) => { dosageAmount: number; dosageType: string }

export const parseDosage: ParseDosageType = (dosage) => {
  const match = dosage.match(/(\d+)([^\d]+)/)

  if (match) {
    const dosageAmount = parseInt(match[1])
    const dosageType = match[2]
    return { dosageAmount, dosageType }
  }

  return { dosageAmount: 0, dosageType: '회분' }
}
