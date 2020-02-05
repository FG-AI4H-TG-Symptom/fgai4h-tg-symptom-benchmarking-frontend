import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core'

import { fetchCaseSet as fetchCaseSetAction } from '../data/caseSets/caseSetsActions'
import CaseSetComponent from './CaseSetComponent'
// import { CaseDataType } from '../util/CaseDataType'
// import { Loading } from '../util/UtilTypes'
import { RootState } from '../data/rootReducer'
import { CaseSetsState } from '../data/caseSets/caseSetsReducers'

type CaseSetContainerDataProps = {
  caseSets: CaseSetsState // Loading<{ cases: CaseDataType[] }>
  caseSetId: string
}
type CaseSetContainerFunctionProps = {
  fetchCaseSet: (caseSetId: string) => void
}
type CaseSetContainerProps = CaseSetContainerDataProps &
  CaseSetContainerFunctionProps

const CaseSetContainer: React.FC<CaseSetContainerProps> = ({
  caseSets,
  caseSetId,
  fetchCaseSet,
}) => {
  useEffect(() => {
    fetchCaseSet(caseSetId)
  }, [fetchCaseSet, caseSetId])

  const caseSet = caseSets[caseSetId]
  return (
    <>
      <h2>Cases</h2>
      {!caseSet || caseSet.loading === true ? (
        <CircularProgress />
      ) : (
        <CaseSetComponent caseSet={caseSet.cases} />
      )}
    </>
  )
}

function mapStateToProps(state: RootState): CaseSetContainerDataProps {
  const { caseSets } = state
  return {
    caseSets,
    caseSetId: 'london_model2019_cases_v1',
  }
}

const mapDispatchToProps: CaseSetContainerFunctionProps = {
  fetchCaseSet: fetchCaseSetAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseSetContainer)
