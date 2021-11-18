import { useNavigate, useParams } from 'react-router-dom'

import { fetchAddress } from 'api/jobcoin'
import { useQueryClient } from 'react-query'
import { useState } from 'react'

// Uses local storage to track who is "logged in" since there is no sensitive data here
// Simply mimicking integrating with a auth service but this ideally is some sort of jwt token,
// and is managed somewhere other than this hook

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  // use the react router utilities to pull data when navigating directly to a users page
  const { address = '' } = useParams()

  const token = localStorage.getItem('jobcoin-token')

  // only show read only content if user is not validated
  // assuming only 1 logged in user per browser
  const [isValidated] = useState(address === token)

  const signout = () => {
    localStorage.removeItem('jobcoin-token')
    // clears api cache for this address
    queryClient.removeQueries(['jobcoin', address])
    navigate('/')
  }

  const signin = (address: string) => {
    localStorage.setItem('jobcoin-token', address)
    // start api call immediately and load from cache in other components
    queryClient.prefetchQuery(['jobcoin', address], () => fetchAddress(address))
    navigate(`/jobcoin/${address}`)
  }
  return { address, isValidated, signout, signin }
}
