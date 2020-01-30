import React from 'react'
import { CaseData } from '../types/CaseData'

const CaseSetComponent: React.FC<{ caseSet: CaseData[] }> = ({ caseSet }) => (
  <pre style={{ textAlign: 'left', maxHeight: '50vh', overflowY: 'auto' }}>
    {JSON.stringify(caseSet, null, 2)}
  </pre>
)

export default CaseSetComponent
