import React from 'react'
import { Paper } from '@material-ui/core'

import { CaseDataType } from '../../data/caseSets/caseDataType'
import ViewRaw from '../common/ViewRaw'
import CaseSetViewerTable from './CaseSetViewerTable'
import TabFactory, { TabFactoryEntry } from '../common/TabFactory'
import CaseSetViewerAnalysis from './CaseSetViewerAnalysis'
import CaseSetEditor from './CaseSetEditor'
import { Notification } from '../../data/application/applicationReducers'

export interface CaseSetComponentProps {
  caseSet: CaseDataType[]
  queueNotification: (notification: Notification) => void
}

const CaseSetViewerComponent: React.FC<CaseSetComponentProps> = ({
  caseSet,
  queueNotification,
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
      id: 'editor',
      name: 'Editor',
      componentCallback: (): JSX.Element => (
        <CaseSetEditor
          caseSet={caseSet}
          queueNotification={queueNotification}
        />
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
