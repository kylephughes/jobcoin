import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { JobcoinLoginContainer } from 'containers'
import { render } from '@testing-library/react'

const queryClient = new QueryClient()
export const renderWithProvider = (element: JSX.Element, initialEntries: Array<string>) => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[...initialEntries]} initialIndex={0}>
        <Routes>
          <Route path="jobcoin/:address" element={element} />
          <Route path="/" element={<JobcoinLoginContainer />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
