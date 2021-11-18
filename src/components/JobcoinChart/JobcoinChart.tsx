import 'react-resizable/css/styles.css'

import { RefObject, SyntheticEvent, useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import { getChartData, getHydratedTransactions, getTickCount } from './utils'

import { Grid } from '@mui/material'
import { JobcoinTransaction } from 'types/jobcoin'
import { Line } from 'react-chartjs-2'
import { useAuth } from 'hooks/useAuth'
import { useWidthObserver } from 'hooks/useWidthObserver'

type JobcoinChartProps = {
  transactions: Array<JobcoinTransaction>
  chartContainerRef: RefObject<HTMLDivElement> | null
}

// https://react-charts.tanstack.com/docs/overview tanstack charts are promising but the api docs
// are in progress so a little difficult to customize at the moment.
const JobcoinChart = (props: JobcoinChartProps) => {
  const { transactions, chartContainerRef } = props
  const { address } = useAuth()

  // state used to interact with resizable box library
  const [height, setHeight] = useState(500)
  // adjust chart to fill the container as the window size changes
  const { width, setWidth } = useWidthObserver(chartContainerRef)

  const hydratedTransactions = getHydratedTransactions(transactions, address)

  const tickCount = getTickCount(width)
  const { data, options } = getChartData(hydratedTransactions, tickCount)

  // keep widths in sync as the chart is expanded to allow scrolling on mobile screens
  // also scroll when resizing breaks parent container
  const handleChartResize = (event: SyntheticEvent, data: ResizeCallbackData) => {
    setHeight(data.size.height)
    setWidth(data.size.width)
  }

  return (
    <Grid style={{ width }} container className="jobcoin-chart-wrapper">
      <ResizableBox height={height} width={width} onResize={handleChartResize}>
        <Line data={data} options={options} />
      </ResizableBox>
    </Grid>
  )
}

export default JobcoinChart
