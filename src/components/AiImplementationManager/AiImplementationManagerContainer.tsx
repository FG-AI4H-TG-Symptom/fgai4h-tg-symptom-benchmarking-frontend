import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CircularProgress, Paper } from '@material-ui/core'

import { fetchAiImplementationList as fetchAiImplementationListAction } from '../../data/aiImplementationList/aiImplementationListActions'
import AiImplementationManagerComponent from './AiImplementationManagerComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'

type AiImplementationManagerContainerDataProps = {
  aiImplementationList: AiImplementationListState
}
type AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: () => void
}
type AiImplementationManagerContainerProps = AiImplementationManagerContainerDataProps &
  AiImplementationManagerContainerFunctionProps

const AiImplementationManagerContainer: React.FC<AiImplementationManagerContainerProps> = ({
  aiImplementationList,
  fetchAiImplementationList,
}) => {
  useEffect(() => {
    fetchAiImplementationList()
  }, [fetchAiImplementationList])

  return (
    <>
      <h2>AI implementations</h2>
      <Paper>
        {!aiImplementationList || aiImplementationList.loading === true ? (
          <CircularProgress />
        ) : (
          <AiImplementationManagerComponent
            aiImplementationList={aiImplementationList.aiImplementations}
          />
        )}
      </Paper>
    </>
  )
}

const mapStateToProps: (
  state: RootState,
) => AiImplementationManagerContainerDataProps = state => ({
  aiImplementationList: state.aiImplementationList,
})
const mapDispatchToProps: AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: fetchAiImplementationListAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AiImplementationManagerContainer)
