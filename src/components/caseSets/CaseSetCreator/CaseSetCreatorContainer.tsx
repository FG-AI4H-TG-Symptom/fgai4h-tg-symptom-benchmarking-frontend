import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CaseSetCreatorComponent from './CaseSetCreatorComponent'
import {
  createCaseSetDataActions,
  CreateCaseSetParameters,
} from '../../../data/caseSets/caseSetActions'
import BasicPageLayout from '../../common/BasicPageLayout'
import { RootState } from '../../../data/rootReducer'
import {
  DataState,
  Loadable,
} from '../../../data/util/dataState/dataStateTypes'
import DataStateManager from '../../common/DataStateManager'
import { paths } from '../../../routes'

type CaseSetCreatorContainerDataProps = {
  createdCaseSetId: Loadable<string>
}
type CaseSetCreatorContainerFunctionProps = {
  createCaseSet: (caseSetParameters: CreateCaseSetParameters) => void
  clearCreateCaseSet: () => void
}
type CasesSetCreatorProps = CaseSetCreatorContainerDataProps &
  CaseSetCreatorContainerFunctionProps

const CaseSetCreatorContainer: React.FC<CasesSetCreatorProps> = ({
  createdCaseSetId,
  createCaseSet,
  clearCreateCaseSet,
}) => {
  const history = useHistory()
  useEffect(() => {
    if (createdCaseSetId.state === DataState.READY) {
      history.push(paths.caseSetViewer(createdCaseSetId.data))
    }

    return (): void => {
      setTimeout(clearCreateCaseSet, 0)
    }
  }, [createdCaseSetId, clearCreateCaseSet, history])

  return (
    <BasicPageLayout title='Generate a new case set'>
      <DataStateManager<string>
        data={createdCaseSetId}
        allowUninitialized
        componentFunction={(): JSX.Element => (
          <CaseSetCreatorComponent onCreateCaseSet={createCaseSet} />
        )}
      />
    </BasicPageLayout>
  )
}

const mapStateToProps: (
  state: RootState,
) => CaseSetCreatorContainerDataProps = state => ({
  createdCaseSetId: state.caseSets.created,
})
const mapDispatchToProps: CaseSetCreatorContainerFunctionProps = {
  createCaseSet: createCaseSetDataActions.load,
  clearCreateCaseSet: createCaseSetDataActions.reset,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CaseSetCreatorContainer)
