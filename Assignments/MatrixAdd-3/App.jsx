import React from 'react'
import MatrixSumCalculator from './MatrixSumCalculator'
import './Styles.css'

function App() {
  return (
    <div className="mx-app">
      <div className="mx-shell">
        <h2 className="mx-app-title">Matrix Sum Calculator</h2>
         <div className="mx-sep" />
        <MatrixSumCalculator />
      </div>
    </div>
  )
}

export default App
