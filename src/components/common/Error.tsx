import { Button, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';

import * as CommonStyled from './CommonStyles';
import * as Styled from './DataStateManager.style';
import PageWrapper, { PageWidth } from './PageWrapper';

const Error: React.FC<{ error: string }> = ({ error }) => (
  <PageWrapper pageWidth={PageWidth.ULTRA_NARROW}>
    <Styled.ErroredCard raised>
      <CardHeader title="Error" />
      <CardContent>
        <Typography>{error}</Typography>
      </CardContent>
      <CommonStyled.CardActionsEnd>
        <Button size="small" onClick={(): void => window.location.reload()}>
          Reload page
        </Button>
      </CommonStyled.CardActionsEnd>
    </Styled.ErroredCard>
  </PageWrapper>
);

export default Error;
