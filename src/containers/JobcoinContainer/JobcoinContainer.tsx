import 'containers/JobcoinContainer/jobcoinContainer.css'

import { Grid } from '@mui/material'
import JobcoinAppBar from 'components/JobcoinAppBar'
import JobcoinBalance from 'components/JobcoinBalance'
import { JobcoinData } from 'types/jobcoin'
import JobcoinTransactions from 'components/JobcoinTransactions'
import JobcoinTransfer from 'components/JobcoinTransfer'
import React from 'react'
import axios from 'axios'
import { fetchAddress } from 'api/jobcoin'
import { useAuth } from 'hooks/useAuth'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// show balance for user not logged in ?
const JobcoinContainer = () => {
  const { address, isValidated, signout } = useAuth()
  // defaults to refetching on window focus
  const addressData = useQuery(['jobcoin', address], () => fetchAddress(address))

  const balance = addressData.data?.balance ?? ''
  const transactions = addressData.data?.transactions ?? []

  return (
    <Grid container>
      <JobcoinAppBar />
      <Grid container justifyContent="center" item xs={12}>
        {addressData.isError ? null : (
          <>
            <Grid container className="jobcoinStatus" direction="column" item xs={12} md={4}>
              <Grid item>
                <JobcoinBalance balance={balance} />
              </Grid>
              <Grid item className="jobcoinTransfer">
                {isValidated && <JobcoinTransfer balance={balance} />}
              </Grid>
            </Grid>
            <Grid className="jobcoin-transaction" item xs={12} md={8}>
              {transactions?.[0] ? <JobcoinTransactions transactions={transactions} /> : null}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default JobcoinContainer
