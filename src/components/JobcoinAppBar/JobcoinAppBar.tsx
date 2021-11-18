import { AppBar, Grid, Toolbar, Typography } from '@mui/material'

import { AuthedUser } from './AuthedUser/AuthedUser'
import { Link } from 'react-router-dom'
import React from 'react'
import { useAuth } from 'hooks/useAuth'

const JobcoinAppBar = () => {
  const { address, isValidated } = useAuth()

  return (
    <>
      <AppBar color="transparent" position="relative">
        <Toolbar>
          <Grid container>
            <Typography component="div">{`Welcome! ${address}`}</Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            {isValidated ? <AuthedUser /> : <Link to="/">Read only mode, please sign in</Link>}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default JobcoinAppBar
