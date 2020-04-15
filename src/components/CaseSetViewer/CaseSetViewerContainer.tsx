import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import CaseSetViewerComponent from './CaseSetViewerComponent'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../common/DataStateManager'
import BasicPageLayout from '../common/BasicPageLayout'
import { caseSetDataAction } from '../../data/caseSets/caseSetActions'
import { Loadable } from '../../data/util/dataState/dataStateTypes'
import { CaseDataType } from '../../data/caseSets/caseDataType'
import { Notification } from '../../data/application/applicationReducers'
import { queueNotification } from '../../data/application/applicationActions'

const CaseSetViewerContainer: React.FC<{}> = () => {
  const { caseSetId } = useParams()
  const dispatch = useDispatch()
  const caseSet = useSelector<RootState, Loadable<CaseDataType[]>>(
    state => state.caseSets.entries[caseSetId],
  )

  useEffect(() => {
    dispatch(caseSetDataAction.load(caseSetId, caseSetId))
  }, [dispatch, caseSetId])

  return (
    <BasicPageLayout title={`Cases in '${caseSetId}'`}>
      <DataStateManager
        loading={!caseSet}
        data={caseSet}
        componentFunction={(caseSetData): JSX.Element => (
          <CaseSetViewerComponent
            caseSet={caseSetData}
            queueNotification={(notification: Notification): void => {
              dispatch(queueNotification(notification))
            }}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetViewerContainer
