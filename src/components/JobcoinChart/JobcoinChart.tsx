import 'react-resizable/css/styles.css'

import React, { RefObject, SyntheticEvent, useEffect, useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import { getHydratedTransactions, getTickCount } from './utils'

import { Grid } from '@mui/material'
import { JobcoinTransaction } from 'types/jobcoin'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

type JobcoinChartProps = {
  transactions: Array<JobcoinTransaction>
  chartContainerRef: RefObject<HTMLDivElement>
}

// https://react-charts.tanstack.com/docs/overview tanstack charts are promising but the api docs
// are in progress so a little difficult to customize at the moment.
const JobcoinChart = (props: JobcoinChartProps) => {
  const { transactions, chartContainerRef } = props
  const { address = '' } = useParams()

  // state used to interact with resizable box library
  const [height, setHeight] = useState(500)
  const [width, setWidth] = useState(chartContainerRef?.current?.offsetWidth ?? 1000)

  const hydratedTransactions = getHydratedTransactions(transactions, address)

  const tickCount = getTickCount(width)
  const data = {
    labels: hydratedTransactions.map(t =>
      new Date(t.timestamp).toLocaleDateString('en-gb', {
        month: 'numeric',
        day: 'numeric',
      }),
    ),
    datasets: [
      {
        label: 'Running Balance',
        data: hydratedTransactions.map(t => t.currentBalance),
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  }
  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: false,
      },
      x: {
        ticks: { maxTicksLimit: tickCount }, // adjust tick count to avoid extra clutter on smaller screens
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  // resize the chart on mobile screen based on the parent container ref
  const handleWindowResize = () => {
    setWidth(chartContainerRef?.current?.offsetWidth ?? window.innerWidth)
  }

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
