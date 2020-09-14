import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePrefix } from './PrefixContext';

const AutoSwitchArrayEntry: React.FC<{
  name: string;
  label: string;
  valueToSet: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}> = ({ name, valueToSet, defaultValue, label, onChange }) => {
  const prefixedName = usePrefix() + name;
  const { register, unregister, setValue, watch } = useFormContext();
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    onChange(selected);
    if (selected) {
      register({ name: prefixedName });
      setValue(prefixedName, valueToSet);
      // trigger an update for other watchers
      watch(prefixedName);
    } else {
      unregister(prefixedName);
    }

    return (): void => {
      unregister(prefixedName);
    };
  }, [onChange, selected, register, setValue, prefixedName, valueToSet, watch, unregister]);

  return (
    <FormControlLabel
      control={<Switch value={selected} onChange={(event): void => setSelected(event.target.checked)} />}
      label={label}
    />
  );
};

export default AutoSwitchArrayEntry;
