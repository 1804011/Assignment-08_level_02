const isValidBangladeshiNumber = (value: string) => {
  const regex = /^\+880\d{10}$/
  return regex.test(value)
}
export const sharedUtilities = { isValidBangladeshiNumber }
