import { EChartsResponsiveOption } from 'echarts';

interface ChartFeatures {
  dataZoom?: boolean;
}

const useChartBaseOptions = (features: ChartFeatures = {}): any => {
  const options: EChartsResponsiveOption = {
    baseOption: {
      legend: {
        top: 4,
        right: 0,
      },
      toolbox: {
        right: 0,
        bottom: -4,
        feature: {
          saveAsImage: {
            title: 'Save image',
            pixelRatio: 2,
            icon: 'path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z', // @material-ui/icons/GetApp
          },
          restore: {
            title: 'Reset preferences',
            icon:
              'path://M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 ' +
              '3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 ' +
              '9-4.03 9-9s-4.03-9-9-9z', // @material-ui/icons/SettingsBackupRestore
          },
          // brush: {},
        },
      },
    },
  };

  if (features.dataZoom) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.baseOption.toolbox.feature.dataZoom = {
      title: {
        zoom: 'Zoom',
        back: 'Reset zoom',
      },
      icon: {
        zoom:
          'path://M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 ' +
          '16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 ' +
          '14 7.01 14 9.5 11.99 14 9.5 14z M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z', // @material-ui/icons/ZoomIn,
        back:
          'path://M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 ' +
          '4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 ' +
          '15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z', // @material-ui/icons/YouTubeSearchedFor
      },
      xAxisIndex: [0, 2],
      yAxisIndex: [0, 2],
    };
  }

  return options;
};

export default useChartBaseOptions;
