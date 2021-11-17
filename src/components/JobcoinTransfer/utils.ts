import { TransferFormState } from './types'

export const isFormValid = (form: TransferFormState) => {
  let isFormValid = true
  Object.values(form).forEach(val => {
    // if one is invalid break mark form as invalid
    if (val.isValid === false) {
      isFormValid = false
    }
  })
  return isFormValid
}

// simple validation that mimics service for better User experience
export const validateAmount = (amount: string, balance: string): string => {
  const amt = Number(amount)
  const bal = Number(balance)
  if (amt) {
    if (amt > bal) {
      return 'Insufficient funds'
    }
  } else {
    return 'Amount must be a real number'
  }
  return ''
}
