import { Card, CardContent, Typography } from '@mui/material'

import React from 'react'

type JobcoinBalanceProps = {
  balance: string
}

const JobcoinBalance: React.FC<JobcoinBalanceProps> = props => {
  const { balance } = props
  return (
    <Card>
      <CardContent>
        <Typography align="center" color="text.secondary" gutterBottom>
          Jobcoin Balance
        </Typography>
        <Typography variant="h5" component="div">
          {balance}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default JobcoinBalance
