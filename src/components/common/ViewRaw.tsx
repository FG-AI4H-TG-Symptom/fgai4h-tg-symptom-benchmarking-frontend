import React from 'react';
import { Box, Button } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';
import * as Styled from './ViewRaw.style';

const ViewRaw: React.FC<{ data: any }> = ({ data }) => (
  <Box flexGrow={1}>
    <Styled.RawView>{JSON.stringify(data, null, 2)}</Styled.RawView>
    <Button onClick={() => copy(JSON.stringify(data))} startIcon={<CopyIcon />}>
      Copy
    </Button>
  </Box>
);

export default ViewRaw;
