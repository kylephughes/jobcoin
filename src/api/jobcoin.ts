import { JobcoinData } from 'types/jobcoin'
import { TransferPayload } from 'components/JobcoinTransfer/types'
import axios from 'axios'

export const fetchAddress = async (address: string): Promise<JobcoinData> => {
  const response = await axios.get(
    `https://jobcoin.gemini.com/idealness-evaluate/api/addresses/${address}`,
  )
  return response.data
}

export const transferCoin = async (transferPayload: TransferPayload) => {
  return await axios.post(
    'https://jobcoin.gemini.com/idealness-evaluate/api/transactions',
    transferPayload,
  )
}
