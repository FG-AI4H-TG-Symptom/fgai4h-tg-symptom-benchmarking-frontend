import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  caseSetDataAction,
  caseSetSaveCaseDataAction,
} from '../../../data/caseSets/caseSetActions'
import { Notification } from '../../../data/application/applicationReducers'
import { queueNotification as queueNotificationAction } from '../../../data/application/applicationActions'
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import { CaseDataType } from '../../../data/caseSets/caseDataType'
import useDataStateLoader from '../../util/useDataStateLoader'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'

import CaseSetCaseEditorComponent from './CaseSetCaseEditorComponent'

const CaseSetCaseEditorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const { caseId, caseSetId } = useParams()

  const caseSet = useDataStateLoader<CaseSetInfo>(
    state => state.caseSets.entries[caseSetId],
    caseSetDataAction.load(caseSetId, { caseSetId }),
  )

  const queueNotification = (notification: Notification): void => {
    dispatch(queueNotificationAction(notification))
  }

  const saveCase = (case_: CaseDataType): void => {
    dispatch(
      caseSetSaveCaseDataAction.load(case_, {
        caseSetId,
        caseId: case_.id,
        onSuccess: () => {
          queueNotification({
            message: 'Case saved',
            type: 'success',
          })
        },
      }),
    )
  }

  return (
    <BasicPageLayout
      title={`Edit case '${caseId}'`}
      subtitle={
        <>
          in case set &apos;
          <DataStateManager
            data={caseSet}
            componentFunction={(caseSetData): string => caseSetData.name}
            interstitial={<>caseSetId</>}
          />
          &apos;
        </>
      }
    >
      <DataStateManager<CaseSetInfo>
        data={caseSet}
        componentFunction={(caseSetData): JSX.Element => (
          <CaseSetCaseEditorComponent
            caseData={caseSetData.cases.find(({ id }) => id === caseId)}
            saveCase={saveCase}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetCaseEditorContainer
