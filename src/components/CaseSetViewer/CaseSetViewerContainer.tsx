import React from 'react'
import { useParams } from 'react-router-dom'

import { caseSetDataAction } from '../../data/caseSets/caseSetActions'
import { CaseDataType } from '../../data/caseSets/caseDataType'
import useDataStateLoader from '../../data/util/dataState/useDataStateLoader'
import DataStateManager from '../common/DataStateManager'
import BasicPageLayout from '../common/BasicPageLayout'

import CaseSetViewerComponent from './CaseSetViewerComponent'

const CaseSetViewerContainer: React.FC<{}> = () => {
  const { caseSetId } = useParams()

  const caseSet = useDataStateLoader<CaseDataType[]>(
    state => state.caseSets.entries[caseSetId],
    caseSetDataAction.load(caseSetId, { caseSetId }),
  )

  return (
    <BasicPageLayout title={`Cases in '${caseSetId}'`}>
      <DataStateManager
        loading={!caseSet}
        data={caseSet}
        componentFunction={(caseSetData): JSX.Element => (
          <CaseSetViewerComponent caseSet={caseSetData} />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetViewerContainer
