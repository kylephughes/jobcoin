export interface JobcoinTransaction {
  timestamp: string
  toAddress: string
  amount: string
}

export interface JobcoinData {
  balance: string
  transactions: Array<JobcoinTransaction>
}
