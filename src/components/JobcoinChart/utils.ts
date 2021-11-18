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
    if (transaction.toAddress === address) {
      runningBalance += Number(transaction.amount)
    } else {
      runningBalance -= Number(transaction.amount)
    }
    hydratedTransactions.push({ ...transaction, currentBalance: runningBalance })
  })
  return hydratedTransactions
}

// using random numbers here based off material default screen sizes
// to prevent unreadable x-axis in larger data sets
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

// chart data supported by react-chartjs-2
export const getChartData = (
  hydratedTransactions: Array<HydratedTransaction>,
  tickCount: number,
) => {
  const data = {
    labels: hydratedTransactions.map(t =>
      new Date(t.timestamp).toLocaleDateString('en-gb', {
        day: 'numeric',
        month: 'numeric',
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
        ticks: { maxTicksLimit: tickCount }, // adjust tick count to avoid extra clutter on smaller screens
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }
  return { data, options }
}
