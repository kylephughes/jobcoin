import 'containers/JobcoinContainer/jobcoinContainer.css'

import React, { useRef } from 'react'

import { Grid } from '@mui/material'
import JobcoinAppBar from 'components/JobcoinAppBar'
import JobcoinBalance from 'components/JobcoinBalance'
import JobcoinChart from 'components/JobcoinChart'
import JobcoinTransfer from 'components/JobcoinTransfer'
import { fetchAddress } from 'api/jobcoin'
import { useAuth } from 'hooks/useAuth'
import { useQuery } from 'react-query'

// show balance for user not logged in ?
const JobcoinContainer = () => {
  const { address, isValidated } = useAuth()
  const chartRef = useRef(null)
  // defaults to refetching on window focus to keep data up to date when switching tabs
  const addressData = useQuery(['jobcoin', address], () => fetchAddress(address))

  const balance = addressData.data?.balance ?? ''
  const transactions = addressData.data?.transactions ?? []

  return (
    <Grid container>
      <JobcoinAppBar />
      <Grid container justifyContent="center" item xs={12}>
        {addressData.isError ? null : (
          <>
            <Grid
              container
              className="jobcoinStatus"
              direction="column"
              item
              xs={12}
              md={12}
              lg={4}
            >
              <Grid item>
                <JobcoinBalance balance={balance} />
              </Grid>
              <Grid item className="jobcoinTransfer">
                {isValidated && <JobcoinTransfer balance={balance} />}
              </Grid>
            </Grid>
            <Grid
              className="jobcoin-transaction-container"
              justifyContent="center"
              ref={chartRef}
              item
              xs={12}
              md={12}
              lg={8}
            >
              {transactions?.[0] ? (
                <JobcoinChart chartContainerRef={chartRef} transactions={transactions} />
              ) : null}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default JobcoinContainer
