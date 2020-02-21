/* eslint-disable import/prefer-default-export */
import React from 'react'

import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
  useMediaQuery,
} from '@material-ui/core'
import echarts from 'echarts'

function registerChartsTheme(theme: Theme): void {
  const chartsColorPalette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ]

  const axisCommon = () => ({
    axisLine: {
      lineStyle: {
        color: theme.palette.text.primary,
      },
    },
    axisTick: {
      lineStyle: {
        color: theme.palette.text.primary,
      },
    },
    axisLabel: {
      textStyle: {
        color: theme.palette.text.hint,
      },
    },
    splitLine: {
      lineStyle: {
        color: theme.palette.divider,
      },
    },
    splitArea: {
      areaStyle: {
        color: theme.palette.text.primary,
      },
    },
  })
  echarts.registerTheme('benchmark', {
    color: chartsColorPalette,
    backgroundColor: theme.palette.background.paper,
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: theme.palette.text.primary,
        },
        crossStyle: {
          color: theme.palette.text.primary,
        },
      },
    },
    legend: {
      textStyle: {
        color: theme.palette.text.primary,
      },
    },
    textStyle: {
      color: theme.palette.text.primary,
    },
    title: {
      textStyle: {
        color: theme.palette.text.primary,
      },
    },
    toolbox: {
      itemSize: 20,
      iconStyle: {
        normal: {
          color: theme.palette.divider,
          borderColor: 'none',
        },
        emphasis: {
          color: theme.palette.text.secondary,
          borderColor: 'none',
        },
      },
    },
    dataZoom: {
      textStyle: {
        color: theme.palette.text.primary,
      },
    },
    timeline: {
      lineStyle: {
        color: theme.palette.text.primary,
      },
      itemStyle: {
        normal: {
          color: chartsColorPalette[1],
        },
      },
      label: {
        normal: {
          textStyle: {
            color: theme.palette.text.primary,
          },
        },
      },
      controlStyle: {
        normal: {
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
        },
      },
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),

    line: {
      symbol: 'circle',
    },
    graph: {
      color: chartsColorPalette,
    },
    gauge: {
      title: {
        textStyle: {
          color: theme.palette.text.primary,
        },
      },
    },
    // candlestick: {
    //   itemStyle: {
    //     normal: {
    //       color: '#FD1050',
    //       color0: '#0CF49B',
    //       borderColor: '#FD1050',
    //       borderColor0: '#0CF49B',
    //     },
    //   },
    // },
  })
}

export const useTheme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return React.useMemo(() => {
    const themeCustomizations = createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: prefersDarkMode ? '#1d5bb4' : '#1e88e5',
        },
        secondary: {
          main: '#008f68',
        },
      },
    })

    themeCustomizations.typography.h1.fontSize = '2rem'
    themeCustomizations.typography.h2.fontSize = '1.8rem'
    themeCustomizations.typography.h3.fontSize = '1.5rem'

    const theme = responsiveFontSizes(themeCustomizations)

    registerChartsTheme(theme)

    return theme
  }, [prefersDarkMode])
}
