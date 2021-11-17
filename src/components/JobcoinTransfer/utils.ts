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
