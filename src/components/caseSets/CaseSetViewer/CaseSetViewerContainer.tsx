import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  caseSetDataAction,
  caseSetSaveDataAction,
} from '../../../data/caseSets/caseSetActions'
import { Notification } from '../../../data/application/applicationReducers'
import { queueNotification as queueNotificationAction } from '../../../data/application/applicationActions'
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import useDataStateLoader from '../../util/useDataStateLoader'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'

import CaseSetViewerComponent from './CaseSetViewerComponent'

const CaseSetViewerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const { caseSetId } = useParams()

  const caseSet = useDataStateLoader<CaseSetInfo>(
    state => state.caseSets.entries[caseSetId],
    caseSetDataAction.load(caseSetId, { caseSetId }),
  )

  const queueNotification = (notification: Notification): void => {
    dispatch(queueNotificationAction(notification))
  }

  const saveCaseSet = (editedCaseSet: CaseSetInfo): void => {
    dispatch(
      caseSetSaveDataAction.load(editedCaseSet, {
        caseSetId,
        onSuccess: () => {
          queueNotification({
            message: 'Case set saved',
            type: 'success',
          })
        },
      }),
    )
  }

  return (
    <BasicPageLayout title={`Cases in '${caseSetId}'`}>
      <DataStateManager<CaseSetInfo>
        data={caseSet}
        componentFunction={(caseSetData): JSX.Element => (
          <CaseSetViewerComponent
            caseSet={caseSetData}
            saveCaseSet={saveCaseSet}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetViewerContainer
