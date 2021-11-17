import { AppBar, Grid, LinearProgress, Toolbar, Typography } from '@mui/material'

import { AuthedUser } from './AuthedUser/AuthedUser'
import { Link } from 'react-router-dom'
import React from 'react'
import { useAuth } from 'hooks/useAuth'
import { useIsFetching } from 'react-query'

const JobcoinAppBar = () => {
  const { address, isValidated } = useAuth()
  const isFetching = useIsFetching()
  console.log(isFetching)
  return (
    <>
      <AppBar color="transparent" position="relative">
        <Toolbar>
          <Grid container>
            <Typography component="div">{`Welcome! ${address}`}</Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            {isValidated ? <AuthedUser /> : <Link to="/">Sign in</Link>}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container>{isFetching ? <LinearProgress /> : <LinearProgress />}</Grid>
    </>
  )
}

export default JobcoinAppBar
