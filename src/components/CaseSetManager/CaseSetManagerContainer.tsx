import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { IconButton } from '@material-ui/core'
import { Add as CreateIcon } from '@material-ui/icons'

import { caseSetListDataActions } from '../../data/caseSets/caseSetActions'
import CaseSetManagerComponent from './CaseSetManagerComponent'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../Common/DataStateManager'
import BasicPageLayout from '../Common/BasicPageLayout'
import LinkWrapper from '../Common/LinkWrapper'
import { paths } from '../../routes'
import { CaseSetInfo } from '../../data/caseSets/caseSetDataType'
import { Loadable } from '../../data/util/dataState/dataStateTypes'

type CaseSetManagerContainerDataProps = {
  caseSetList: Loadable<CaseSetInfo[]>
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
    <BasicPageLayout
      title='Case sets'
      action={
        <LinkWrapper to={paths.caseSetCreator()}>
          <IconButton>
            <CreateIcon />
          </IconButton>
        </LinkWrapper>
      }
    >
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
  caseSetList: state.caseSets.overview,
})
const mapDispatchToProps: CaseSetManagerContainerFunctionProps = {
  fetchCaseSetList: caseSetListDataActions.load,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CaseSetManagerContainer)
