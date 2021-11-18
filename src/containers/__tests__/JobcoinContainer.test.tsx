import { RequestHandler, rest } from 'msw'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import JobcoinContainer from 'containers/JobcoinContainer'
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
  rest.post(`https://jobcoin.gemini.com/idealness-evaluate/api/transactions`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
]

const server = setupServer(...handlers)

describe('JobcoinContainer', () => {
  beforeAll(() => {
    server.listen()
    // fake login
    localStorage.setItem('jobcoin-token', address)
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('Render the job coin container for a validated user and execute successful transfer', async () => {
    renderWithProvider(<JobcoinContainer />, [`/jobcoin/${address}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('5')
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'destination1' } })
    fireEvent.change(inputs[1], { target: { value: '4.99' } })
    const submit = screen.getByText('Send Jobcoins')
    fireEvent.click(submit)
    // wait for the form to clear
    await waitFor(() => {
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('')
    })
  })
  it('Render the job coin container for a validated user and submit a request with invalid funds', async () => {
    renderWithProvider(<JobcoinContainer />, [`/jobcoin/${address}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('5')
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'destination1' } })
    fireEvent.change(inputs[1], { target: { value: '14.99' } })
    const submit = screen.getByText('Send Jobcoins')
    fireEvent.click(submit)
    expect(screen.getByText('Insufficient funds'))
  })

  it('Render the job coin container for a validated user and submit a request with an invalid amount', async () => {
    renderWithProvider(<JobcoinContainer />, [`/jobcoin/${address}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('5')
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'destination1' } })
    fireEvent.change(inputs[1], { target: { value: 'invalid' } })
    const submit = screen.getByText('Send Jobcoins')
    fireEvent.click(submit)
    expect(screen.getByText('Amount must be a real number'))
  })
  it('Render the job coin container for a validated user and submit a request without a destination', async () => {
    renderWithProvider(<JobcoinContainer />, [`/jobcoin/${address}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('5')
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[1], { target: { value: '4.99' } })
    const submit = screen.getByText('Send Jobcoins')
    fireEvent.click(submit)
    expect(screen.getByText('Address is required'))
  })
  it('Render another route without logging out and go into read only mode', async () => {
    renderWithProvider(<JobcoinContainer />, [`/jobcoin/${address2}`])

    // wait for the api call to resolve, this is the balance
    await screen.findByText('0')
    screen.getByText('Read only mode, please sign in')
  })
})
