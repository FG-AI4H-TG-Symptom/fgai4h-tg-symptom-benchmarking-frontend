import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { caseSetDataAction } from '../../data/caseSets/caseSetsActions'
import CaseSetViewerComponent from './CaseSetViewerComponent'
import { RootState } from '../../data/rootReducer'
import { CaseSetsState } from '../../data/caseSets/caseSetsReducers'
import DataStateManager from '../Common/DataStateManager'
import BasicPageLayout from '../Common/BasicPageLayout'

type CaseSetContainerDataProps = {
  caseSets: CaseSetsState
}
type CaseSetContainerFunctionProps = {
  fetchCaseSet: (caseSetId: string) => void
}
type CaseSetContainerProps = CaseSetContainerDataProps &
  CaseSetContainerFunctionProps

const CaseSetViewerContainer: React.FC<CaseSetContainerProps> = ({
  caseSets,
  fetchCaseSet,
}) => {
  const { caseSetId } = useParams()

  useEffect(() => {
    fetchCaseSet(caseSetId)
  }, [fetchCaseSet, caseSetId])

  const caseSet = caseSets[caseSetId]
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

function mapStateToProps(state: RootState): CaseSetContainerDataProps {
  const { caseSets } = state
  return {
    caseSets,
  }
}

const mapDispatchToProps: (
  dispatch: Dispatch,
) => CaseSetContainerFunctionProps = dispatch => ({
  fetchCaseSet: (caseSetId: string): void => {
    dispatch(caseSetDataAction.load(caseSetId, caseSetId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CaseSetViewerContainer)
