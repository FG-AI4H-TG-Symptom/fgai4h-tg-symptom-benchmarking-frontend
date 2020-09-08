import React, { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';
import PageWrapper from './PageWrapper';

const BasicPageLayout: React.FC<{
  title: ReactNode;
  subtitle?: ReactNode;
  action?: React.ReactElement;
  unlimitedWidth?: boolean;
}> = ({ title, subtitle, action, children, unlimitedWidth }) => {
  let content = (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Typography variant="h2">{title}</Typography>
          {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}
        </div>
        {action}
      </Box>
      {children}
    </>
  );
  if (!unlimitedWidth) {
    content = <PageWrapper>{content}</PageWrapper>;
  }

  return <>{content}</>;
};

export default BasicPageLayout;
