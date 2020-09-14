import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import React, { ReactNode, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export interface TabFactoryEntry {
  id: string;
  name: string;
  componentCallback: () => ReactNode;
  disabled?: boolean;
  noPadding?: boolean;
}
export interface TabFactoryProps {
  ariaPrefix: string;
  ariaLabel: string;
  tabs: Array<TabFactoryEntry>;
}

const TabFactoryControlled: React.FC<
  TabFactoryProps & {
    tabIndex: number;
    onTabChange: (newTabIndex: number) => void;
  }
> = ({ ariaPrefix, ariaLabel, tabs, tabIndex, onTabChange }) => (
  <>
    <Paper>
      <Tabs value={tabIndex} onChange={(event, newTabIndex): void => onTabChange(newTabIndex)} aria-label={ariaLabel}>
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
        role="tabpanel"
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
);

const TabFactoryHash: React.FC<TabFactoryProps> = ({ ariaPrefix, ariaLabel, tabs }) => {
  const history = useHistory();
  const hash = useLocation().hash.replace('#', '');
  const tabIndex = Math.max(
    0,
    tabs.findIndex(({ id }) => id === hash),
  );

  const onTabChange = (newTabIndex: number): void => {
    history.push(`#${tabs[newTabIndex].id}`);
  };

  return (
    <TabFactoryControlled
      ariaPrefix={ariaPrefix}
      ariaLabel={ariaLabel}
      tabs={tabs}
      tabIndex={tabIndex}
      onTabChange={onTabChange}
    />
  );
};

const TabFactoryState: React.FC<TabFactoryProps> = ({ ariaPrefix, ariaLabel, tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const onTabChange = (newTabIndex: number): void => {
    setTabIndex(newTabIndex);
  };

  return (
    <TabFactoryControlled
      ariaPrefix={ariaPrefix}
      ariaLabel={ariaLabel}
      tabs={tabs}
      tabIndex={tabIndex}
      onTabChange={onTabChange}
    />
  );
};

const TabFactory: React.FC<
  TabFactoryProps & {
    stateStorage?: 'state' | 'hash';
  }
> = ({ ariaPrefix, ariaLabel, tabs, stateStorage = 'state' }) => {
  if (stateStorage === 'hash') {
    return <TabFactoryHash ariaPrefix={ariaPrefix} ariaLabel={ariaLabel} tabs={tabs} />;
  }

  return <TabFactoryState ariaPrefix={ariaPrefix} ariaLabel={ariaLabel} tabs={tabs} />;
};

export default TabFactory;
