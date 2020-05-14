import React from 'react'
import { Paper } from '@material-ui/core'

import { CaseDataType } from '../../../data/caseSets/caseDataType'
import ViewRaw from '../../common/ViewRaw'
import CaseSetViewerTable from './CaseSetViewerTable'
import TabFactory, { TabFactoryEntry } from '../../common/TabFactory'
import CaseSetViewerAnalysis from './CaseSetViewerAnalysis'

export interface CaseSetComponentProps {
  caseSet: CaseDataType[]
}

const CaseSetViewerComponent: React.FC<CaseSetComponentProps> = ({
  caseSet,
}) => {
  const tabs: TabFactoryEntry[] = [
    {
      id: 'table-view',
      name: 'Table',
      componentCallback: (): JSX.Element => (
        <CaseSetViewerTable caseSet={caseSet} />
      ),
      noPadding: true,
    },
    {
      id: 'analysis',
      name: 'Analysis',
      componentCallback: (): JSX.Element => (
        <CaseSetViewerAnalysis caseSet={caseSet} />
      ),
    },
    {
      id: 'raw',
      name: 'Raw',
      componentCallback: (): JSX.Element => <ViewRaw data={caseSet} />,
    },
    {
      id: 'export',
      name: 'Export',
      componentCallback: (): null => null,
      disabled: true,
    },
  ]

  return (
    <Paper>
      <TabFactory
        ariaPrefix='case-set-viewing'
        ariaLabel='case set viewing mode tabs'
        tabs={tabs}
        stateStorage='hash'
      />
    </Paper>
  )
}

export default CaseSetViewerComponent
