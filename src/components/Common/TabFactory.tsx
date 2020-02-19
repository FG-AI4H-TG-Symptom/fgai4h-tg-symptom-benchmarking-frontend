import React, { ReactNode, useState } from 'react'
import { Box, Paper, Tab, Tabs } from '@material-ui/core'

export interface TabFactoryEntry {
  id: string
  name: string
  componentCallback: () => ReactNode
  disabled?: boolean
  noPadding?: boolean
}
export interface TabFactoryProps {
  ariaPrefix: string
  ariaLabel: string
  tabs: Array<TabFactoryEntry>
  defaultIndex?: number
}

const TabFactory: React.FC<TabFactoryProps> = ({
  ariaPrefix,
  ariaLabel,
  tabs,
  defaultIndex = 0,
}) => {
  const [tabIndex, setTabIndex] = useState(defaultIndex)

  return (
    <>
      <Paper>
        <Tabs
          value={tabIndex}
          onChange={(event, x): void => setTabIndex(x)}
          aria-label={ariaLabel}
        >
          {tabs.map(({ id, name, disabled }) => (
            <Tab
              key={`${ariaPrefix}_tab_${id}`}
              id={`${ariaPrefix}_tab_${id}`}
              aria-controls={`${ariaPrefix}_panel_${id}`}
              label={name}
              disabled={disabled}
            />
          ))}
        </Tabs>
      </Paper>
      {tabs.map(({ id, noPadding, componentCallback }, index) => (
        <Box
          role='tabpanel'
          key={`${ariaPrefix}_panel_${id}`}
          id={`${ariaPrefix}_panel_${id}`}
          aria-labelledby={`${ariaPrefix}_tab_${id}`}
          padding={noPadding ? 0 : 2}
          hidden={tabIndex !== index}
        >
          {tabIndex === index ? componentCallback() : null}
        </Box>
      ))}
    </>
  )
}

export default TabFactory
