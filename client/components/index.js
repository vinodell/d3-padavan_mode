import React from 'react'

import Graph from './graph'
import CheckboxEtnos from './checkbox_choice'
import CheckboxAge from './checkbox_age'

const Index = () => {
  return (
    <div>
      <Graph />
      <div className="flex flex-col">
        <div className="w-full text-center bg-gray-400 font-mono hover:bg-gray-500">
          choose age, (years)
        </div>
        <CheckboxAge />
        <div className="w-full text-center bg-gray-400 font-mono hover:bg-gray-500">
          choose etnos
        </div>
        <CheckboxEtnos />
      </div>
    </div>
  )
}

export default Index
