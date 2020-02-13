import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

import { fetchCaseSetList as fetchCaseSetListAction } from '../../data/caseSetList/caseSetListActions'
import CaseSetManagerComponent from './CaseSetManagerComponent'
import { CaseSetListState } from '../../data/caseSetList/caseSetListReducers'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../util/DataStateManager'

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
      <Typography variant='h2' gutterBottom>
        Case sets
      </Typography>
      <DataStateManager
        data={caseSetList}
        componentFunction={(caseSetListData): JSX.Element => (
          <CaseSetManagerComponent caseSetList={caseSetListData} />
        )}
      />
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
