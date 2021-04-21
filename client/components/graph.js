import React from 'react'
// import React, { useState, useEffect } from 'react'
// import { scaleLinear, scaleTime } from 'd3-scale'

// import data from '../../data.json'

// const DEFAULT_HEIGHT = 1200
// const DEFAULT_WIDTH = 400
// const X_MARGIN = 20
// const Y_MARGIN = 50

// const drawLine = ({ width, height }) => {
//   const getNewAxis = (cx) => select('#chart').append('g').attr('class', cx)

//   const scaleX = scaleLinear().domain().range()

//   const scaleY = scaleTime().domain().range()
// }

const Graph = () => {
  // const [width] = useState(DEFAULT_HEIGHT)
  // const [height] = useState(DEFAULT_WIDTH)
  // useEffect(() => {
  //   drawLine({ width, height })
  // }, [width, height])
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is Graph dude
        </div>
        {/* <svg width={width} height={height} id="chart" /> */}
      </div>
    </div>
  )
}

export default Graph
