import { useNavigate, useParams } from 'react-router-dom'

import { fetchAddress } from 'api/jobcoin'
import { useQueryClient } from 'react-query'
import { useState } from 'react'

// TODO move to cookie
export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // prioritze route param for fetching of data
  const { address = '' } = useParams()
  const token = localStorage.getItem('jobcoin-token')
  // only show read only content if user is not validated
  // assuming only 1 logged in user per browser
  const [isValidated, setIsValidated] = useState(address === token)

  const signout = () => {
    localStorage.removeItem('jobcoin-token')
    // clears api cache for this address
    queryClient.removeQueries(['jobcoin', address])
    navigate('/')
  }
  // ideally this would be more secure
  const signin = (address: string) => {
    localStorage.setItem('jobcoin-token', address)
    // start api call immediately and load from cache in other components
    queryClient.prefetchQuery(['jobcoin', address], () => fetchAddress(address))
    navigate(`/jobcoin/${address}`)
  }
  return { address, isValidated, signout, signin }
}
