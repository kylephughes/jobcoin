import JobcoinChart from '../JobcoinChart'
import { renderWithProvider } from 'tests/utils'
import { screen } from '@testing-library/react'

const address = 'Kyle-Addr'
const mockTransactions = [
  { timestamp: '2021-11-16T12:45:20.839Z', toAddress: 'Kyle-Addr', amount: '50' },
  {
    timestamp: '2021-11-16T12:57:07.712Z',
    fromAddress: 'Kyle-Addr',
    toAddress: 'sometext',
    amount: '1',
  },
  {
    timestamp: '2021-11-16T14:56:10.734Z',
    fromAddress: 'Kyle-Addr',
    toAddress: 'Test-1',
    amount: '5',
  },
  {
    timestamp: '2021-11-16T15:09:04.889Z',
    fromAddress: 'Kyle-Addr',
    toAddress: 'Test-1',
    amount: '1',
  },
  {
    timestamp: '2021-11-16T15:10:28.494Z',
    fromAddress: 'Kyle-Addr',
    toAddress: 'Test-1',
    amount: '1.5',
  },
]
describe('JobcoinChart', () => {
  it('Render jobcoin chart and make sure there is an image rendered', async () => {
    renderWithProvider(<JobcoinChart chartContainerRef={null} transactions={mockTransactions} />, [
      `/jobcoin/${address}`,
    ])

    await screen.findByRole('img')
  })
})
