import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CircularProgress, Paper } from '@material-ui/core'

import {
  fetchAiImplementationList as fetchAiImplementationListAction,
  fetchAiImplementationHealth as fetchAiImplementationHealthAction,
} from '../../data/aiImplementationList/aiImplementationListActions'
import AiImplementationManagerComponent from './AiImplementationManagerComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'

type AiImplementationManagerContainerDataProps = {
  aiImplementationList: AiImplementationListState
}
type AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: () => void
  fetchAiImplementationHealth: (aiImplementationName: string) => void
}
type AiImplementationManagerContainerProps = AiImplementationManagerContainerDataProps &
  AiImplementationManagerContainerFunctionProps

const AiImplementationManagerContainer: React.FC<AiImplementationManagerContainerProps> = ({
  aiImplementationList,
  fetchAiImplementationList,
  fetchAiImplementationHealth,
}) => {
  useEffect(() => {
    fetchAiImplementationList()
  }, [fetchAiImplementationList])

  useEffect(() => {
    if (aiImplementationList.loading === true) {
      return
    }

    Object.values(aiImplementationList.aiImplementations)
      .filter(({ health }) => health === null || health === undefined)
      .forEach(({ name }) => fetchAiImplementationHealth(name))
  }, [fetchAiImplementationHealth, aiImplementationList])

  return (
    <>
      <h2>AI implementations</h2>
      <Paper>
        {!aiImplementationList || aiImplementationList.loading === true ? (
          <CircularProgress />
        ) : (
          <AiImplementationManagerComponent
            aiImplementations={aiImplementationList.aiImplementations}
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
  fetchAiImplementationHealth: fetchAiImplementationHealthAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AiImplementationManagerContainer)
