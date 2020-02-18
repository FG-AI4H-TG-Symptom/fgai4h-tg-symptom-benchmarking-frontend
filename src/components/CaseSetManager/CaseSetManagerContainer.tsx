import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { caseSetListDataActions } from '../../data/caseSetList/caseSetListActions'
import CaseSetManagerComponent from './CaseSetManagerComponent'
import { CaseSetListState } from '../../data/caseSetList/caseSetListReducers'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../Common/DataStateManager'
import BasicPageLayout from '../Common/BasicPageLayout'

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
    <BasicPageLayout title='Case sets'>
      <DataStateManager
        data={caseSetList}
        componentFunction={(caseSetListData): JSX.Element => (
          <CaseSetManagerComponent caseSetList={caseSetListData} />
        )}
      />
    </BasicPageLayout>
  )
}

const mapStateToProps: (
  state: RootState,
) => CaseSetManagerContainerDataProps = state => ({
  caseSetList: state.caseSetList,
})
const mapDispatchToProps: CaseSetManagerContainerFunctionProps = {
  fetchCaseSetList: caseSetListDataActions.load,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CaseSetManagerContainer)
