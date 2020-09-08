import React from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';

import PageWrapper, { PageWidth } from './PageWrapper';
import LinkWrapper from './LinkWrapper';

import * as CommonStyled from './CommonStyles';

const Warning: React.FC<{
  title: string;
  actions: Array<{ text: string; targetUrl: string }>;
}> = ({ title, actions, children }) => (
  <PageWrapper pageWidth={PageWidth.ULTRA_NARROW}>
    <Card>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      <CommonStyled.CardActionsEnd>
        {actions.map(({ text, targetUrl }) => (
          <LinkWrapper key={text} to={targetUrl}>
            {' '}
            <Button color="primary" size="small">
              {text}
            </Button>
          </LinkWrapper>
        ))}
      </CommonStyled.CardActionsEnd>
    </Card>
  </PageWrapper>
);

export default Warning;
