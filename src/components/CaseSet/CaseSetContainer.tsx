import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Typography } from '@material-ui/core'

import { fetchCaseSet as fetchCaseSetAction } from '../../data/caseSets/caseSetsActions'
import CaseSetComponent from './CaseSetComponent'
import { RootState } from '../../data/rootReducer'
import { CaseSetsState } from '../../data/caseSets/caseSetsReducers'
import DataStateManager from '../util/DataStateManager'

type CaseSetContainerDataProps = {
  caseSets: CaseSetsState
}
type CaseSetContainerFunctionProps = {
  fetchCaseSet: (caseSetId: string) => void
}
type CaseSetContainerProps = CaseSetContainerDataProps &
  CaseSetContainerFunctionProps

const CaseSetContainer: React.FC<CaseSetContainerProps> = ({
  caseSets,
  fetchCaseSet,
}) => {
  const { caseSetId } = useParams()

  useEffect(() => {
    fetchCaseSet(caseSetId)
  }, [fetchCaseSet, caseSetId])

  const caseSet = caseSets[caseSetId]
  return (
    <>
      <Typography variant='h2' gutterBottom>
        Cases in &quot;{caseSetId}&quot;
      </Typography>
      <DataStateManager
        loading={!caseSet}
        data={caseSet}
        componentFunction={(caseSetData): JSX.Element => (
          <CaseSetComponent caseSet={caseSetData} />
        )}
      />
    </>
  )
}

function mapStateToProps(state: RootState): CaseSetContainerDataProps {
  const { caseSets } = state
  return {
    caseSets,
  }
}

const mapDispatchToProps: CaseSetContainerFunctionProps = {
  fetchCaseSet: fetchCaseSetAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseSetContainer)
