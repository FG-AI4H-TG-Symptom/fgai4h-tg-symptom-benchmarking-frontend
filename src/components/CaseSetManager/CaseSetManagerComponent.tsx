import React from 'react'
import { Button } from '@material-ui/core'

import LinkWrapper from '../util/LinkWrapper'
import { paths } from '../../routes'

const LONDON_CASE_SET_ID = 'london_model2019_cases_v1'

const CaseSetManagerComponent: React.FC<{}> = () => (
  <>
    <LinkWrapper to={`${paths.cases(LONDON_CASE_SET_ID)}`}>
      <Button variant='contained' color='primary'>
        Cases from doctors
      </Button>
    </LinkWrapper>
  </>
)

export default CaseSetManagerComponent
