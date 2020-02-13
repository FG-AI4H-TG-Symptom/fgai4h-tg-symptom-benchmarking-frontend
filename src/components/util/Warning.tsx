import React from 'react'
import { Button, Card, CardContent, CardHeader } from '@material-ui/core'

import TextPageWrapper from './TextPageWrapper'
import LinkWrapper from './LinkWrapper'

import * as Styled from './Warning.style'

const Warning: React.FC<{
  title: string
  actions: Array<{ text: string; targetUrl: string }>
}> = ({ title, actions, children }) => (
  <TextPageWrapper narrow>
    <Card>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      <Styled.CardActionsEnd>
        {actions.map(({ text, targetUrl }) => (
          <LinkWrapper key={text} to={targetUrl}>
            {' '}
            <Button color='primary' size='small'>
              {text}
            </Button>
          </LinkWrapper>
        ))}
      </Styled.CardActionsEnd>
    </Card>
  </TextPageWrapper>
)

export default Warning
