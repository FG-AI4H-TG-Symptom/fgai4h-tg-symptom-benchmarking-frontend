import React from 'react'
import { useDispatch } from 'react-redux'

import { IconButton } from '@material-ui/core'
import { Add as CreateIcon } from '@material-ui/icons'

import {
  caseSetDeleteDataAction,
  caseSetListDataActions,
} from '../../../data/caseSets/caseSetActions'
import CaseSetManagerComponent from './CaseSetManagerComponent'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'
import LinkWrapper from '../../common/LinkWrapper'
import { paths } from '../../../routes'
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import useDataStateLoader from '../../util/useDataStateLoader'

const CaseSetManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()

  const caseSets = useDataStateLoader<CaseSetInfo[]>(
    'caseSets',
    caseSetListDataActions.load(),
  )

  const deleteCaseSet = (caseSetId: string): void => {
    dispatch(caseSetDeleteDataAction.load(caseSetId, { caseSetId }))
  }

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
      <DataStateManager<CaseSetInfo[]>
        data={caseSets}
        componentFunction={(caseSetsData): JSX.Element => (
          <CaseSetManagerComponent
            caseSetList={caseSetsData}
            deleteCaseSet={deleteCaseSet}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default CaseSetManagerContainer
