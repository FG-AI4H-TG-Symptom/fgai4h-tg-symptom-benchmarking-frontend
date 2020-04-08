import React, { useMemo } from 'react'
import { MenuItem } from '@material-ui/core'

import { refToConcept } from './utils'
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'
import AutoSelect from './AutoSelect'

interface ConditionSelectProps {
  name?: string
}

const ConditionSelect: React.FC<ConditionSelectProps> = ({ name }) => {
  const fieldName = name ? `${name}.id` : 'id'

  const possibleValues = useMemo(
    () =>
      berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) =>
        refToConcept($ref),
      ),
    [],
  )

  return (
    <AutoSelect name={fieldName} label='Condition'>
      {possibleValues.map(value => (
        <MenuItem key={value.id} value={value.id}>
          {value.name}
        </MenuItem>
      ))}
    </AutoSelect>
  )
}

export default ConditionSelect
