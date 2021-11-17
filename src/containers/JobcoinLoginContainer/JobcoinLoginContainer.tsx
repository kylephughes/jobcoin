import 'containers/JobcoinContainer/jobcoinContainer.css'
import 'containers/JobcoinLoginContainer/jobcoinLoginContainer.css'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

import { useAuth } from 'hooks/useAuth'

const JobcoinLoginContainer = () => {
  const [address, setAddress] = useState('')
  const [isError, setIsError] = useState(false)
  const { signin } = useAuth()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddress(event.target.value)
  }
  // allow any address to signin
  const handleSignin = () => {
    if (address !== '') {
      signin(address)
    } else {
      setIsError(true)
    }
  }
  return (
    <Grid container className="login-container" item justifyContent="center" alignContent="center">
      <Grid item>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Welcome! Sign In with Your Jobcoin Address
            </Typography>

            <Divider />
            <Grid container>
              <Grid item xs={12} className="form-field">
                <TextField
                  required
                  fullWidth
                  error={isError}
                  helperText={isError ? 'Address is required' : ''}
                  value={address}
                  onChange={handleChange}
                  label="Jobcoin Address"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center">
              <Button onClick={handleSignin} size="small">
                Sign In
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default JobcoinLoginContainer
