import React, { useMemo } from 'react'
import ReactEcharts from 'echarts-for-react'
import datalib from 'datalib'
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import merge from 'lodash/merge'

import { CaseDataType } from '../../data/caseSets/caseDataType'
import getBaseOptions from '../charts/chartBaseOptions'

const categories = ['male', 'female']

export interface CaseSetComponentProps {
  caseSet: CaseDataType[]
}

const CaseSetViewerAnalysis: React.FC<CaseSetComponentProps> = ({
  caseSet,
}) => {
  const histograms = useMemo(
    () =>
      categories.map(sex =>
        datalib.histogram(
          caseSet
            .filter(
              ({
                caseData: {
                  profileInformation: { biologicalSex },
                },
              }) => biologicalSex === sex,
            )
            .map(
              ({
                caseData: {
                  profileInformation: { age },
                },
              }) => age,
            ),
        ),
      ),
    [caseSet],
  )
  const binLabels = histograms[0].map(
    ({ value }) => `${value}-${value + histograms[0].bins.step}`,
  )
  const maxCount = Math.max(
    ...histograms.map(histogram => histogram.map(({ count }) => count)).flat(),
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
      textStyle: {
        fontSize: 12,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
    },
    max: maxCount,
    minInterval: 1,
  }
  const populationPyramidOptions = merge(getBaseOptions(), {
    baseOption: {
      legend: {
        data: categories,
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
        {
          gridIndex: 0,
          type: 'category',
          inverse: true,
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            margin: 8,
            textStyle: {
              fontSize: 12,
            },
          },
          data: binLabels,
        },
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#9D9EA0',
              fontSize: 12,
            },
          },
          data: binLabels.map(value => ({
            value,
            textStyle: {
              align: 'center',
            },
          })),
        },
        {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#9D9EA0',
              fontSize: 12,
            },
          },
          data: binLabels,
        },
      ],
      series: histograms.map((histogram, index) => ({
        name: categories[index],
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card variant='outlined'>
          <CardHeader title='Age / biological sex distribution' />
          <CardContent>
            <ReactEcharts
              option={populationPyramidOptions}
              opts={{ renderer: 'svg' }}
              style={{ width: '100%', height: '50vh' }}
              theme='benchmark'
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CaseSetViewerAnalysis
