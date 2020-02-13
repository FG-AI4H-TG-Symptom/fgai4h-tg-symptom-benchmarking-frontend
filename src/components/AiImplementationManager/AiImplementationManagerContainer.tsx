import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

import {
  fetchAiImplementationHealth as fetchAiImplementationHealthAction,
  fetchAiImplementationList as fetchAiImplementationListAction,
} from '../../data/aiImplementationList/aiImplementationListActions'
import AiImplementationManagerComponent from './AiImplementationManagerComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'
import { DataState } from '../util/UtilTypes'
import DataStateManager from '../util/DataStateManager'

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
    if (aiImplementationList.state !== DataState.READY) {
      return
    }

    Object.values(aiImplementationList.data)
      .filter(({ health }) => health === null || health === undefined)
      .forEach(({ name }) => fetchAiImplementationHealth(name))
  }, [fetchAiImplementationHealth, aiImplementationList])

  return (
    <>
      <Typography variant='h2' gutterBottom>
        AI implementations
      </Typography>
      <DataStateManager
        data={aiImplementationList}
        componentFunction={(aiImplementationListData): JSX.Element => (
          <AiImplementationManagerComponent
            aiImplementations={aiImplementationListData}
          />
        )}
      />
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
