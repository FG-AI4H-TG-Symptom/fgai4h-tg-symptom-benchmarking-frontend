import React from 'react'
import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core'

import { fetchCaseSet } from '../actions/caseSetsActions'
import CaseSetComponent from '../components/CaseSetComponent'
// import { CaseData } from '../types/CaseData'
// import { Loading } from '../types/UtilTypes'
import { RootState } from '../reducers'
import { CaseSetsState } from '../reducers/caseSetsReducers'

type CaseSetContainerProps = {
  fetchCaseSet: (caseSetId: string) => void,
  caseSets: CaseSetsState // Loading<{ cases: CaseData[] }>
}

class CaseSetContainer extends React.Component<CaseSetContainerProps> {
  caseSetId = 'london_model2019_cases_v1'

  componentDidMount(): void {
    this.props.fetchCaseSet(this.caseSetId)
  }

  render() {
    const { caseSets } = this.props
    const caseSet = caseSets[this.caseSetId]
    return (
      <>
        <h2>Cases</h2>
        {
          !caseSet || caseSet.loading === true
            ? <CircularProgress />
            : <CaseSetComponent caseSet={caseSet.cases} />
        }
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { caseSets } = state
  return {
    caseSets
  }
}

export default connect(
  mapStateToProps,
  {
    fetchCaseSet
  }
)(CaseSetContainer)
