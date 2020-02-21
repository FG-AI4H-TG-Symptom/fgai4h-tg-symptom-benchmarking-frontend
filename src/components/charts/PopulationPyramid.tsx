import React, { useMemo } from 'react'
import ReactEcharts from 'echarts-for-react'
import datalib from 'datalib'
import merge from 'lodash/merge'

import getBaseOptions from './defaultChartBaseOptions'
import { Population } from './chartTypes'
import defaultChartOpts from './defaultChartOpts'

const biologicalSexes = ['male', 'female']

const calculateStatistics = (population: Population) => {
  const histograms = biologicalSexes.map(sex =>
    datalib.histogram(
      population
        .filter(({ biologicalSex }) => biologicalSex === sex)
        .map(({ age }) => age),
    ),
  )

  const binLabels = histograms[0].map(
    ({ value }) => `${value}-${value + histograms[0].bins.step}`,
  )
  const maxCountInBin = Math.max(
    ...histograms.map(histogram => histogram.map(({ count }) => count)).flat(),
  )

  return { histograms, binLabels, maxCountInBin }
}

interface PopulationPyramidProps {
  population: Population
}

const PopulationPyramid: React.FC<PopulationPyramidProps> = ({
  population,
}) => {
  const { histograms, binLabels, maxCountInBin } = useMemo(
    () => calculateStatistics(population),
    [population],
  )

  const baseXAxis = {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    position: 'top',
    axisLabel: {
      show: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
    },
    max: maxCountInBin,
    minInterval: 1,
  }
  const baseYAxis = {
    type: 'category',
    inverse: true,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    data: binLabels,
  }

  const populationPyramidOptions = merge(getBaseOptions({ dataZoom: true }), {
    baseOption: {
      legend: {
        data: biologicalSexes,
      },
      grid: [
        {
          show: false,
          left: 10,
          top: 40,
          bottom: 30,
          containLabel: true,
          width: '40%',
        },
        {
          show: false,
          left: '50%',
          top: 60,
          bottom: 30,
          width: '0%',
        },
        {
          show: false,
          right: 10,
          top: 40,
          bottom: 30,
          containLabel: true,
          width: '40%',
        },
      ],
      xAxis: [
        merge({}, baseXAxis, {
          gridIndex: 0,
          inverse: true,
        }),
        {
          gridIndex: 1,
          show: false,
        },
        merge({}, baseXAxis, {
          gridIndex: 2,
        }),
      ],
      yAxis: [
        merge({}, baseYAxis, {
          gridIndex: 0,
          position: 'right',
        }),
        merge({}, baseYAxis, {
          gridIndex: 1,
          position: 'left',
          axisLabel: {
            show: true,
          },
          data: binLabels.map(value => ({
            value,
            textStyle: {
              align: 'center',
            },
          })),
        }),
        merge({}, baseYAxis, {
          gridIndex: 2,
          position: 'left',
        }),
      ],
      series: histograms.map((histogram, index) => ({
        name: biologicalSexes[index],
        data: histogram.map(({ count }) => count),
        type: 'bar',
        barWidth: 20,
        barGap: 20,
        xAxisIndex: index === 0 ? 0 : 2,
        yAxisIndex: index === 0 ? 0 : 2,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
            position: index === 0 ? 'left' : 'right',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
        },
      })),
    },
  })

  return (
    <ReactEcharts
      option={populationPyramidOptions}
      opts={defaultChartOpts}
      style={{ width: '100%', height: '50vh' }}
      theme='benchmark'
    />
  )
}

export default PopulationPyramid
