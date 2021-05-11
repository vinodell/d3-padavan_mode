import React, { useState, useEffect } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { schemeSet3 } from 'd3-scale-chromatic'
// eslint-disable-next-line
import { min, max, select, axisLeft, axisBottom, line, curveCardinal } from 'd3'

import useFilterData from './data_filter'

const DEFAULT_HEIGHT = 400
const DEFAULT_WIDTH = 800
const X_MARGIN = 30
const Y_MARGIN = 40

// eslint-disable-next-line
const drawLine = ({ width, height, texas, dataForChart }) => {
  const color = schemeSet3
  console.log('this is texas___DDDDD', texas)
  const getNewAxis = (cx) => select('#chart').append('g').attr('class', cx)

  const scaleX = scaleTime()
    .domain([
      new Date(min(texas.map((it) => it.year)), 1, 1),
      new Date(max(texas.map((it) => it.year)), 1, 1)
    ])
    .range([2 * X_MARGIN, width])

  const scaleY = scaleLinear()
    .domain([min(texas.map((it) => it.value)), max(texas.map((it) => it.value))])
    .range([height - Y_MARGIN, 0])

  const Yax = select('.y-axis')
  const Xax = select('.x-axis')

  const Yaxis = axisLeft().scale(scaleY)
  const Xaxis = axisBottom().scale(scaleX);

  (Yax.empty() ? getNewAxis('y-axis') : Yax)
    .transition()
    .attr('transform', `translate(${scaleX.range()[0]}, ${scaleY.range()[1]})`)
    .call(Yaxis);
  (Xax.empty() ? getNewAxis('x-axis') : Xax)
    .transition()
    .attr('transform', `translate(${0}, ${height - Y_MARGIN})`)
    .call(Xaxis)

  // console.log('this is item from forEach _____+++_____', item, index)
  const chartLine = line()
    .curve(curveCardinal)
    .x((d) => scaleX(new Date(d.year, 1, 1)))
    .y((d) => scaleY(d.value))

  const chartPath = select('#chart').selectAll('.path-go').data(dataForChart)

  chartPath
    .enter()
    .append('path')
    .attr('class', 'path-go')
    .attr('stroke', (d, index) => color[index])
    .attr('stroke-width', '2')
    .attr('fill', 'none')
    .transition()
    .attr('d', (d) => {
      console.log('This is chartPath d _________!!!!!', d)
      return chartLine(d)
    })

  chartPath.exit().remove()
}

const Graph = () => {
  const dataForChart = useFilterData().sort((a, b) => a.year - b.year)
  const texas = dataForChart.flat().map((it) => ({
    year: it.year,
    value: it.value
  }))
  console.log('THIS IS _________ res from useFilter in GRAPH.js', dataForChart)
  const [width] = useState(DEFAULT_WIDTH)
  const [height] = useState(DEFAULT_HEIGHT)
  useEffect(() => {
    // eslint-disable-next-line
    drawLine({ width, height, texas, dataForChart })
  }, [width, height, texas, dataForChart])
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-gray-900 flex flex-wrap content-around justify-center px-5 py-5">
        <div className="bg-indigo-600 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4">
          <div className="flex items-end">
            <svg width={width} height={height} id="chart" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graph
