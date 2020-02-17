import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

import {
  aiImplementationListDataActions,
  aiImplementationListLoadParameters,
} from '../../data/aiImplementationList/aiImplementationListActions'
import AiImplementationManagerComponent from './AiImplementationManagerComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../Common/DataStateManager'

type AiImplementationManagerContainerDataProps = {
  aiImplementationList: AiImplementationListState
}
type AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: (
    parameters: aiImplementationListLoadParameters,
  ) => void
}
type AiImplementationManagerContainerProps = AiImplementationManagerContainerDataProps &
  AiImplementationManagerContainerFunctionProps

const AiImplementationManagerContainer: React.FC<AiImplementationManagerContainerProps> = ({
  aiImplementationList,
  fetchAiImplementationList,
}) => {
  useEffect(() => {
    fetchAiImplementationList({ withHealth: true })
  }, [fetchAiImplementationList])

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
  // todo: blocked on https://github.com/microsoft/TypeScript/issues/29131
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchAiImplementationList: (aiImplementationListDataActions.load as any) as (
    parameters: aiImplementationListLoadParameters,
  ) => void,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AiImplementationManagerContainer)
