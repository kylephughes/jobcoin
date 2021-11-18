import { Card, CardContent, Typography } from '@mui/material'

type JobcoinBalanceProps = {
  balance: string
}

const JobcoinBalance: React.FC<JobcoinBalanceProps> = props => {
  const { balance } = props
  return (
    <Card>
      <CardContent>
        <Typography align="center" color="text.secondary">
          Jobcoin Balance
        </Typography>
        <Typography align="center" variant="h6" component="div">
          {balance}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default JobcoinBalance
