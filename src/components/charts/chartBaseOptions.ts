const useChartBaseOptions = () => {
  return {
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
          dataZoom: {
            title: {
              zoom: 'Zoom',
              back: 'Reset zoom',
            },
            xAxisIndex: [0, 2],
            yAxisIndex: [0, 2],
          },
          // brush: {},
        },
      },
      xAxis: [
        {
          gridIndex: 0,
          type: 'value',
          inverse: true,
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
          },
          minInterval: 1,
        },
        {
          gridIndex: 1,
          show: false,
        },
        {
          gridIndex: 2,
          type: 'value',
          axisLine: {
            // show: false,
          },
          axisTick: {
            // show: false,
          },
          position: 'top',
          axisLabel: {
            // show: true,
          },
          splitLine: {
            // show: true,
          },
          minInterval: 1,
        },
      ],
      yAxis: {
        type: 'category',
        inverse: true,
        position: 'right',
        axisLine: {
          // show: false,
        },
        axisTick: {
          // show: false,
        },
        axisLabel: {
          // show: false,
          // margin: 8,
        },
      },
    },
  }
}

export default useChartBaseOptions
