import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Check as FinishedIcon, LinearScale as CreatedIcon, PlayArrow as RunningIcon } from '@material-ui/icons';
import { green, yellow, cyan } from '@material-ui/core/colors';
import { BenchmarkingSessionStatus } from '../../../data/benchmarks/benchmarkManagerDataType';

const BenchmarkingSessionStatusIcon: React.FC<{
  status: BenchmarkingSessionStatus;
}> = ({ status }) => {
  if (status === BenchmarkingSessionStatus.CREATED) {
    return (
      <Tooltip title="Created">
        <CreatedIcon color="primary" fontSize="large" style={{ color: yellow[500] }} />
      </Tooltip>
    );
  }

  if (status === BenchmarkingSessionStatus.FINISHED) {
    return (
      <Tooltip title="Finished">
        <FinishedIcon fontSize="large" style={{ color: green[500] }} />
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Currently running">
      <RunningIcon fontSize="large" style={{ color: cyan[500] }} />
    </Tooltip>
  );
};

export default BenchmarkingSessionStatusIcon;
