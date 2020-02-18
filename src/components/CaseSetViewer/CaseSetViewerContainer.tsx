import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import CaseSetViewerComponent from './CaseSetViewerComponent'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../Common/DataStateManager'
import BasicPageLayout from '../Common/BasicPageLayout'
import { caseSetDataAction } from '../../data/caseSets/caseSetActions'
import { Loadable } from '../../data/util/dataState/dataStateTypes'
import { CaseDataType } from '../../data/caseSets/caseDataType'

type CaseSetContainerDataProps = {
  caseSets: {
    [caseSetId: string]: Loadable<CaseDataType[]>
  }
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
  return {
    caseSets: state.caseSets.entries,
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
