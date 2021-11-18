import 'components/JobcoinTransfer/jobcoinTransfer.css'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import {
  JobcoinTransferProps,
  TransferFormAction,
  TransferFormState,
  TransferPayload,
} from 'components/JobcoinTransfer/types'
import React, { useReducer, useState } from 'react'
import { isFormValid, validateAmount } from './utils'
import { useMutation, useQueryClient } from 'react-query'

import { transferCoin } from 'api/jobcoin'
import { useParams } from 'react-router-dom'

const IntialTransferFormState = {
  destinationAddress: { value: '', isValid: false, error: 'Address is required' },
  amount: { value: '', isValid: false, error: 'Amount is required' },
}

// control form state transitions & validation of fields
const transferFormReducer = (state: TransferFormState, action: TransferFormAction) => {
  switch (action.type) {
    case 'SET_DESTINATION_ADDRESS':
      const isValid = action.payload !== ''
      return {
        ...state,
        destinationAddress: {
          value: action.payload,
          isValid,
          error: isValid ? '' : 'Address is required',
        },
      }

    case 'SET_AMOUNT':
      const errorMsg = validateAmount(action.payload, action.balance)
      return {
        ...state,
        amount: {
          value: action.payload,
          isValid: errorMsg === '',
          error: errorMsg,
        },
      }

    case 'CLEAR_FORM':
      return { ...IntialTransferFormState }
    default:
      return state
  }
}

const JobcoinTransfer = (props: JobcoinTransferProps) => {
  const { balance } = props
  const queryClient = useQueryClient()
  const mutation = useMutation((transfer: TransferPayload) => transferCoin(transfer), {
    onSuccess: () => {
      // forces refreshing the query in the cache to get the latest data for other consumers
      queryClient.invalidateQueries(['jobcoin', address])
      dispatch({ type: 'CLEAR_FORM' })
    },
  })
  const { address } = useParams()

  const [transferForm, dispatch] = useReducer(transferFormReducer, { ...IntialTransferFormState })
  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmit = () => {
    setSubmitting(true)
    if (isFormValid(transferForm)) {
      setSubmitting(false)
      mutation.mutate({
        fromAddress: address ?? '',
        toAddress: transferForm.destinationAddress.value,
        amount: transferForm.amount.value,
      })
    }
  }
  const isFieldDisabled = Number(balance) === 0
  return (
    <Card>
      <CardContent>
        <Typography align="center" color="text.secondary" gutterBottom>
          Send Jobcoin
        </Typography>

        <Divider />
        <Grid container>
          <Grid item xs={12} className="form-field">
            <TextField
              disabled={isFieldDisabled}
              required
              fullWidth
              error={submitting && !transferForm.destinationAddress.isValid}
              value={transferForm.destinationAddress.value}
              helperText={submitting && transferForm.destinationAddress.error}
              onChange={e => dispatch({ type: 'SET_DESTINATION_ADDRESS', payload: e.target.value })}
              label="Destination Address"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="form-field">
            <TextField
              disabled={isFieldDisabled}
              required
              error={submitting && !transferForm.amount.isValid}
              fullWidth
              helperText={submitting && transferForm.amount.error}
              value={transferForm.amount.value}
              onChange={e => dispatch({ type: 'SET_AMOUNT', payload: e.target.value, balance })}
              label="Amount to Send"
              variant="outlined"
            />
          </Grid>
          {mutation.isError && (
            <Grid item xs={12} className="form-field">
              <Typography>
                Something went wrong sending the transfer:
                {(mutation as any)?.error?.response?.data?.error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center">
          <Button disabled={isFieldDisabled} onClick={handleFormSubmit} size="small">
            Send Jobcoins
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default JobcoinTransfer
