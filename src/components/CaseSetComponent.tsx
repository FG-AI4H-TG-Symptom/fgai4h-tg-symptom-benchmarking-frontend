import React from 'react'
import { CaseDataType } from '../data/caseSets/caseDataType'

const CaseSetComponent: React.FC<{ caseSet: CaseDataType[] }> = ({ caseSet }) => (
  <pre style={{ textAlign: 'left', maxHeight: '50vh', overflowY: 'auto' }}>
    {JSON.stringify(caseSet, null, 2)}
  </pre>
)

export default CaseSetComponent
