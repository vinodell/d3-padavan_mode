import React from 'react'

import Graph from './graph'
import CheckboxEtnos from './checkbox_choice'
import CheckboxAge from './checkbox_age'

const Index = () => {
  return (
    <div>
      <Graph />
      <div className="flex flex-col">
        <CheckboxAge />
        <CheckboxEtnos />
      </div>
    </div>
  )
}

export default Index
