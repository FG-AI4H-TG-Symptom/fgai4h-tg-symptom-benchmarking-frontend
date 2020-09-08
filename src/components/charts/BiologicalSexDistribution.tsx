import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import merge from 'lodash/merge';

import getBaseOptions from './defaultChartBaseOptions';
import { Population } from './chartTypes';
import defaultChartOpts from './defaultChartOpts';

const biologicalSexes = ['male', 'female'];

interface PopulationPyramidProps {
  population: Population;
}

const BiologicalSexDistribution: React.FC<PopulationPyramidProps> = ({ population }) => {
  const counts = useMemo(
    () =>
      biologicalSexes.map((sex) => ({
        name: sex,
        value: population.filter(({ biologicalSex }) => biologicalSex === sex).length,
      })),
    [population],
  );

  const biologicalSexDistributionOptions = merge(getBaseOptions(), {
    baseOption: {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        data: biologicalSexes,
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            normal: {
              formatter: '{c}',
              position: 'inside',
            },
            emphasis: {
              show: false,
            },
          },
          data: counts,
        },
      ],
    },
  });

  return (
    <ReactEcharts
      option={biologicalSexDistributionOptions}
      opts={defaultChartOpts}
      style={{ width: '100%', height: '50vh' }}
      theme="benchmark"
    />
  );
};

export default BiologicalSexDistribution;
