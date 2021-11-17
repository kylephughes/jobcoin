import { Grid } from '@mui/material'
import { JobcoinTransaction } from 'types/jobcoin'
import { Line } from 'react-chartjs-2'
import React from 'react'
import { useParams } from 'react-router-dom'

type JobcoinTransactionsProps = {
  transactions: Array<JobcoinTransaction>
}

interface HydratedTransaction extends JobcoinTransaction {
  currentBalance: number
  isMakingMoney: boolean
}

// Calculate the running balance after each transaction
const getHydratedTransactions = (transactions: Array<JobcoinTransaction>, address: string) => {
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
const JobcoinTransactions = (props: JobcoinTransactionsProps) => {
  const { transactions } = props
  const { address = '' } = useParams()

  const hydratedTransactions = getHydratedTransactions(transactions, address)
  const data = {
    labels: hydratedTransactions.map(t =>
      new Date(t.timestamp).toLocaleDateString('en-gb', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    ),
    datasets: [
      {
        label: 'Running Balance',
        data: hydratedTransactions.map(t => t.currentBalance),
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  }
  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: false,
      },
      x: {
        ticks: { maxTicksLimit: 6 },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }

  return (
    <Grid container item className="jobcoin-transaction-wrapper">
      <Line height="300" width="1200" data={data} options={options} />
    </Grid>
  )
}

export default JobcoinTransactions
