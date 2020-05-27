import React from 'react'
import { Paper } from '@material-ui/core'

import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import { Notification } from '../../../data/application/applicationReducers'
import ViewRaw from '../../common/ViewRaw'
import CaseSetViewerTable from './CaseSetViewerTable'
import TabFactory, { TabFactoryEntry } from '../../common/TabFactory'
import CaseSetViewerAnalysis from './CaseSetViewerAnalysis'
import CaseSetEditor from './CaseSetEditor'

export interface CaseSetComponentProps {
  caseSet: CaseSetInfo
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
          caseSet={caseSet.cases}
          queueNotification={queueNotification}
        />
      ),
      noPadding: true,
      // todo: remove once editor implementation is completed / PR merged
      disabled: true,
    },
    {
      id: 'analysis',
      name: 'Analysis',
      componentCallback: (): JSX.Element => (
        <CaseSetViewerAnalysis caseSet={caseSet.cases} />
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
