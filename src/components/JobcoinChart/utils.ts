import { HydratedTransaction } from './types'
import { JobcoinTransaction } from 'types/jobcoin'

// Calculate the running balance after each transaction
export const getHydratedTransactions = (
  transactions: Array<JobcoinTransaction>,
  address: string,
) => {
  let hydratedTransactions: Array<HydratedTransaction> = []
  let runningBalance = 0
  transactions.forEach(transaction => {
    let isMakingMoney = false
    if (transaction.toAddress === address) {
      isMakingMoney = true
      runningBalance += Number(transaction.amount)
    } else {
      runningBalance -= Number(transaction.amount)
    }
    hydratedTransactions.push({ ...transaction, currentBalance: runningBalance, isMakingMoney })
  })
  return hydratedTransactions
}

// using arbitrary numbers here based off material default screen sizes
export const getTickCount = (width: number) => {
  if (width > 1920) {
    return 30
  } else if (width > 1280) {
    return 25
  } else if (width > 960) {
    return 20
  } else if (width > 600) {
    return 15
  } else {
    return 5
  }
}
