import JobcoinTransfer from '../JobcoinTransfer'
import { renderWithProvider } from 'tests/utils'
import { screen } from '@testing-library/react'

const address = 'Kyle-Addr'

describe('JobcoinTransfer', () => {
  it('Render jobcoin transfer widget if balance is greater than 0', async () => {
    renderWithProvider(<JobcoinTransfer balance={'12'} />, [`/jobcoin/${address}`])

    const inputs = await screen.findAllByRole('textbox')
    expect(inputs[0]).not.toBeDisabled
    expect(inputs[1]).not.toBeDisabled
    expect(screen.getByRole('button')).not.toBeDisabled
  })
  it('disable jobcoin transfer actions if balance is 0', async () => {
    renderWithProvider(<JobcoinTransfer balance={'0'} />, [`/jobcoin/${address}`])

    const inputs = await screen.findAllByRole('textbox')
    expect(inputs[0]).toBeDisabled
    expect(inputs[1]).toBeDisabled
    expect(screen.getByRole('button')).toBeDisabled
  })
})
