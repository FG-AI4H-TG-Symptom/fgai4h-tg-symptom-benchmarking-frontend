import React from 'react'

import { Button, CardContent, CardHeader, Typography } from '@material-ui/core'

import TextPageWrapper from './TextPageWrapper'

import * as Styled from './DataStateManager.style'
import * as CommonStyled from './CommonStyles'

const Error: React.FC<{ error: string }> = ({ error }) => (
  <TextPageWrapper narrow>
    <Styled.ErroredCard raised>
      <CardHeader title='Error' />
      <CardContent>
        <Typography>{error}</Typography>
      </CardContent>
      <CommonStyled.CardActionsEnd>
        <Button size='small' onClick={(): void => window.location.reload()}>
          Reload page
        </Button>
      </CommonStyled.CardActionsEnd>
    </Styled.ErroredCard>
  </TextPageWrapper>
)

export default Error
