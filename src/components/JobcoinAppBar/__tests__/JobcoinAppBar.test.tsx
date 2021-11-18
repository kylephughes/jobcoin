import { RequestHandler, rest } from 'msw'
import { fireEvent, screen } from '@testing-library/react'

import JobcoinAppBar from '../JobcoinAppBar'
import React from 'react'
import { renderWithProvider } from 'tests/utils'
import { setupServer } from 'msw/node'

const address = 'Kyle-Addr'
const address2 = 'Test'

const handlers: Array<RequestHandler> = [
  rest.get(
    `https://jobcoin.gemini.com/idealness-evaluate/api/addresses/${address}`,
    (req, res, ctx) => {
      return res(ctx.json({ balance: '5', transactions: [] } as any))
    },
  ),
  rest.get(
    `https://jobcoin.gemini.com/idealness-evaluate/api/addresses/${address2}`,
    (req, res, ctx) => {
      return res(ctx.json({ balance: '0', transactions: [] } as any))
    },
  ),
]

const server = setupServer(...handlers)

describe('JobcoinAppBar', () => {
  beforeAll(() => {
    server.listen()
    // fake login
    localStorage.setItem('jobcoin-token', address)
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('Render the app bar welcoming the validated user', async () => {
    renderWithProvider(<JobcoinAppBar />, [`/jobcoin/${address}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('Welcome! Kyle-Addr')
  })

  it('Render the user icon for a validated user and show the signout button to route back to sign in page', async () => {
    renderWithProvider(<JobcoinAppBar />, [`/jobcoin/${address}`])

    const userButton = await screen.findByRole('button')
    fireEvent.click(userButton)
    const signOut = await screen.findByText('Sign out')
    fireEvent.click(signOut)
    screen.getByText('Sign In')
    screen.getByText('Welcome! Sign In with Your Jobcoin Address')
  })
})
