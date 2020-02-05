import React from 'react'
import CaseSetContainer from './components/CaseSetContainer'

import * as Styled from './App.style'

const App: React.FC = () => (
  <div>
    <Styled.Header>
      {/* todo: copy header with AI4H / ITU / WHO information */}
      <h1>&quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)</h1>
    </Styled.Header>
    <Styled.Main>
      <CaseSetContainer />
    </Styled.Main>
  </div>
)
export default App
