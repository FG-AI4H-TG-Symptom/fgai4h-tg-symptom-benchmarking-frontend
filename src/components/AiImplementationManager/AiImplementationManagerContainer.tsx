import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  aiImplementationListDataActions,
  aiImplementationListLoadParameters,
} from '../../data/aiImplementationList/aiImplementationListActions'
import AiImplementationManagerComponent from './AiImplementationManagerComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'
import DataStateManager from '../Common/DataStateManager'
import BasicPageLayout from '../Common/BasicPageLayout'

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
    <BasicPageLayout title='AI implementations'>
      <DataStateManager
        data={aiImplementationList}
        componentFunction={(aiImplementationListData): JSX.Element => (
          <AiImplementationManagerComponent
            aiImplementations={aiImplementationListData}
          />
        )}
      />
    </BasicPageLayout>
  )
}

const mapStateToProps: (
  state: RootState,
) => AiImplementationManagerContainerDataProps = state => ({
  aiImplementationList: state.aiImplementationList,
})
const mapDispatchToProps: AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: aiImplementationListDataActions.load,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AiImplementationManagerContainer)
