import React from 'react'
import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core'

import { fetchCaseSet } from '../data/caseSets/caseSetsActions'
import CaseSetComponent from './CaseSetComponent'
// import { CaseDataType } from '../util/CaseDataType'
// import { Loading } from '../util/UtilTypes'
import { RootState } from '../data/rootReducer'
import { CaseSetsState } from '../data/caseSets/caseSetsReducers'

type CaseSetContainerDataProps = {
  caseSets: CaseSetsState; // Loading<{ cases: CaseDataType[] }>
}
type CaseSetContainerFunctionProps = {
  fetchCaseSet: (caseSetId: string) => void;
}

class CaseSetContainer extends React.Component<CaseSetContainerDataProps & CaseSetContainerFunctionProps> {
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

function mapStateToProps(state: RootState): CaseSetContainerDataProps {
  const { caseSets } = state
  return {
    caseSets
  }
}

const mapDispatchToProps: CaseSetContainerFunctionProps = {
  fetchCaseSet
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseSetContainer)
