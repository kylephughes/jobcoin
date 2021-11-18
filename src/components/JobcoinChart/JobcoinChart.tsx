import 'react-resizable/css/styles.css'

import { RefObject, SyntheticEvent, useEffect, useLayoutEffect, useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import { getChartData, getHydratedTransactions, getTickCount } from './utils'

import { Grid } from '@mui/material'
import { JobcoinTransaction } from 'types/jobcoin'
import { Line } from 'react-chartjs-2'
import { connect } from 'tls'
import { useParams } from 'react-router-dom'
import { useWidthObserver } from 'hooks/useWidthObserver'

type JobcoinChartProps = {
  transactions: Array<JobcoinTransaction>
  chartContainerRef: RefObject<HTMLDivElement> | null
}

// https://react-charts.tanstack.com/docs/overview tanstack charts are promising but the api docs
// are in progress so a little difficult to customize at the moment.
const JobcoinChart = (props: JobcoinChartProps) => {
  const { transactions, chartContainerRef } = props
  const { address = '' } = useParams()
  // const { width, setWidth } = useWidthObserver(chartContainerRef)

  const [width, setWidth] = useState(chartContainerRef?.current?.offsetWidth ?? 1000)

  // state used to interact with resizable box library
  const [height, setHeight] = useState(500)

  const hydratedTransactions = getHydratedTransactions(transactions, address)

  const tickCount = getTickCount(width)
  const { data, options } = getChartData(hydratedTransactions, tickCount)

  useEffect(() => {
    // update graph on window resize, add timeout to prevent edge case of resize being called multiple times
    let timeoutId: any = null
    const handleWindowResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWidth(chartContainerRef?.current?.offsetWidth ?? window.innerWidth)
      }, 300)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  // resize the containers as it is resized
  const handleChartResize = (event: SyntheticEvent, data: ResizeCallbackData) => {
    setHeight(data.size.height)
    setWidth(data.size.width)
  }

  // keep widths in sync as the chart is expanded to allow scrolling on mobile screens
  // also scroll when resizing breaks parent container
  return (
    <Grid style={{ width }} container className="jobcoin-chart-wrapper">
      <ResizableBox height={height} width={width} onResize={handleChartResize}>
        <Line data={data} options={options} />
      </ResizableBox>
    </Grid>
  )
}

export default JobcoinChart
