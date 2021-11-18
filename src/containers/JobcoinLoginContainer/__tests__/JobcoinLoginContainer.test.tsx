import { RequestHandler, rest } from 'msw'
import { fireEvent, screen } from '@testing-library/react'

import JobcoinContainer from 'containers/JobcoinContainer'
import { renderWithProvider } from 'tests/utils'
import { setupServer } from 'msw/node'

const address = 'Kyle-Addr'

const handlers: Array<RequestHandler> = [
  rest.get(
    `https://jobcoin.gemini.com/idealness-evaluate/api/addresses/${address}`,
    (req, res, ctx) => {
      return res(ctx.json({ balance: '5', transactions: [] } as any))
    },
  ),
]

const server = setupServer(...handlers)

describe('JobcoinLoginContainer', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('Render the login form and submit the form', async () => {
    // routes to coin container
    renderWithProvider(<JobcoinContainer />, [`/`])

    expect(localStorage.getItem('jobcoin-token')).toBeNull
    // wait for the api call to resolve, this is the balance
    await screen.findByText('Welcome! Sign In with Your Jobcoin Address')
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: address } })
    const submit = screen.getByText('Sign In')
    fireEvent.click(submit)
    // wait for the form to clear
    await screen.findByText('Welcome! Kyle-Addr')
    expect(localStorage.getItem('jobcoin-token')).toBe(address)
  })
})
