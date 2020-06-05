import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  createCaseSetDataActions,
  CreateCaseSetParameters,
} from '../../../data/caseSets/caseSetActions'
import {
  ID_PLACEHOLDER_NEW,
  LoadableCreateOnly,
} from '../../../data/util/dataState/dataStateTypes'
import { RootState } from '../../../data/rootReducer'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'
import { paths } from '../../../routes'

import CaseSetCreatorComponent from './CaseSetCreatorComponent'

const CaseSetCreatorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const createdCaseSet = useSelector<RootState, LoadableCreateOnly>(
    state => state.caseSets[ID_PLACEHOLDER_NEW],
  )

  const createCaseSet = (caseSetParameters: CreateCaseSetParameters): void => {
    dispatch(
      createCaseSetDataActions.load(caseSetParameters, {
        onSuccess: caseSet => {
          history.push(paths.caseSetViewer(caseSet.id))
        },
      }),
    )
  }

  return (
    <BasicPageLayout title='Generate a new case set'>
      <DataStateManager<string>
        data={createdCaseSet}
        allowUninitialized
        componentFunction={(): JSX.Element => (
          <CaseSetCreatorComponent onCreateCaseSet={createCaseSet} />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetCreatorContainer
