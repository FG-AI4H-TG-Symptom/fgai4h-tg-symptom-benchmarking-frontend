import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CircularProgress, Paper } from '@material-ui/core'

import { fetchCaseSetList as fetchCaseSetListAction } from '../../data/caseSetList/caseSetListActions'
import CaseSetManagerComponent from './CaseSetManagerComponent'
import { CaseSetListState } from '../../data/caseSetList/caseSetListReducers'
import { RootState } from '../../data/rootReducer'

type CaseSetManagerContainerDataProps = {
  caseSetList: CaseSetListState
}
type CaseSetManagerContainerFunctionProps = {
  fetchCaseSetList: () => void
}
type CaseSetManagerContainerProps = CaseSetManagerContainerDataProps &
  CaseSetManagerContainerFunctionProps

const CaseSetManagerContainer: React.FC<CaseSetManagerContainerProps> = ({
  caseSetList,
  fetchCaseSetList,
}) => {
  useEffect(() => {
    fetchCaseSetList()
  }, [fetchCaseSetList])

  return (
    <>
      <h2>Case sets</h2>
      <Paper>
        {!caseSetList || caseSetList.loading === true ? (
          <CircularProgress />
        ) : (
          <CaseSetManagerComponent caseSetList={caseSetList.caseSets} />
        )}
      </Paper>
    </>
  )
}

const mapStateToProps: (
  state: RootState,
) => CaseSetManagerContainerDataProps = state => ({
  caseSetList: state.caseSetList,
})
const mapDispatchToProps: CaseSetManagerContainerFunctionProps = {
  fetchCaseSetList: fetchCaseSetListAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CaseSetManagerContainer)
