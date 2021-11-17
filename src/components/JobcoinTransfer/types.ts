export type TransferPayload = {
  fromAddress: string
  toAddress: string
  amount: string
}

export type DispatchType = 'SET_DESTINATION_ADDRESS' | 'SET_AMOUNT' | 'CLEAR_FORM'
export type TransferFormAction =
  | {
      type: 'SET_DESTINATION_ADDRESS'
      payload: string
    }
  | {
      type: 'SET_AMOUNT'
      payload: string
      balance: string
    }
  | {
      type: 'CLEAR_FORM'
    }

type FormfieldState = {
  value: string
  isValid: boolean
  error: string
}
export type TransferFormState = {
  destinationAddress: FormfieldState
  amount: FormfieldState
}

export type JobcoinTransferProps = {
  balance: string
}
