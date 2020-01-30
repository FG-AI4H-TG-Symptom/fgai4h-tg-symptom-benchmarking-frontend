import React from 'react'
import './App.css'
import CaseSetContainer from './components/CaseSetContainer'

const App: React.FC = () => (
  <div className='App'>
    <header className='App-header'>
      {/* todo: copy header with AI4H / ITU / WHO information */}
      <h1>&quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)</h1>
    </header>
    <main>
      <CaseSetContainer />
    </main>
  </div>
)
export default App
