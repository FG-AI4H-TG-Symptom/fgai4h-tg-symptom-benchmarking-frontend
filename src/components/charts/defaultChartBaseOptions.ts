import { EChartsResponsiveOption } from 'echarts'

interface ChartFeatures {
  dataZoom?: boolean
}

const useChartBaseOptions = (features: ChartFeatures = {}) => {
  const options: EChartsResponsiveOption = {
    baseOption: {
      legend: {
        top: 4,
        right: 0,
      },
      toolbox: {
        right: 0,
        bottom: 0,
        feature: {
          saveAsImage: {
            title: 'Save image',
          },
          restore: {
            title: 'Reset preferences',
          },
          // brush: {},
        },
      },
    },
  }

  if (features.dataZoom) {
    // @ts-ignore
    options.baseOption.toolbox.feature.dataZoom = {
      title: {
        zoom: 'Zoom',
        back: 'Reset zoom',
      },
      xAxisIndex: [0, 2],
      yAxisIndex: [0, 2],
    }
  }

  return options
}

export default useChartBaseOptions
