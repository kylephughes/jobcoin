import { JobcoinTransaction } from 'types/jobcoin'

export interface HydratedTransaction extends JobcoinTransaction {
  currentBalance: number
  isMakingMoney: boolean
}
