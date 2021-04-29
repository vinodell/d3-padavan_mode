import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { scaleLinear, scaleTime } from 'd3-scale'
import {
  min, max, select, axisLeft, axisBottom, curveCatmullRomOpen, line
} from 'd3'

import data from '../../data.json'

const DEFAULT_HEIGHT = 400
const DEFAULT_WIDTH = 1000
const X_MARGIN = 20
const Y_MARGIN = 50

const info = data
  .map((it) => ({
    value: +it.value,
    year: +it.year
  }))
  .filter((it) => !Number.isNaN(it.value))

const drawLine = ({ width, height }) => {
  const getNewAxis = (cx) => select('#chart').append('g').attr('class', cx)

  const scaleX = scaleTime()
    .domain([min(info.map((it) => it.year)), max(info.map((it) => it.year))])
    .range([2 * X_MARGIN, width - X_MARGIN * 10])

  const scaleY = scaleLinear()
    .domain([min(info.map((it) => it.value)), max(info.map((it) => it.value))])
    .range([height - Y_MARGIN * 2, Y_MARGIN])

  const Yax = select('.y-axis')
  const Xax = select('.x-axis')

  const Yaxis = axisLeft().scale(scaleY)
  const Xaxis = axisBottom().scale(scaleX);

  (Yax.empty() ? getNewAxis('y-axis') : Yax)
    .transition()
    .attr('transform', `translate(${2 * X_MARGIN}, ${Y_MARGIN})`)
    .call(Yaxis);

  (Xax.empty() ? getNewAxis('x-axis') : Xax)
    .transition()
    .attr('transform', `translate(${0}, ${height - Y_MARGIN})`)
    .call(Xaxis);

  const chartLine = line()
    .curve(curveCatmullRomOpen)
    .x((d) => scaleX(d.year))
    .y((d) => scaleY(d.value))

  const chartPath = select('.path');
  (chartPath.empty() ? select('#chart').append('path').attr('class', 'path') : chartPath)
    .datum(info)
    .attr('stroke', 'grey')
    .attr('stroke-width', '2')
    .attr('fill', 'none')
    .transition()
    .attr('d', chartLine)
}

const Graph = () => {
  // const { ...checkBoxChoices } = useSelector((s) => s.graphic)
  const [width] = useState(DEFAULT_WIDTH)
  const [height] = useState(DEFAULT_HEIGHT)

  useEffect(() => {
    drawLine({ width, height })
  }, [width, height])
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
