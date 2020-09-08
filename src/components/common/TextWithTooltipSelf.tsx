import { Tooltip } from '@material-ui/core';
import React from 'react';

const TextWithTooltipSelf: React.FC<{ children: string }> = ({ children }) => (
  <Tooltip title={children}>
    <span>{children}</span>
  </Tooltip>
);

export default TextWithTooltipSelf;
