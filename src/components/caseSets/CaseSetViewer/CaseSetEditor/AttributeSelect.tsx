import React, { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Grid, Hidden, IconButton, MenuItem } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import berlinModelSchema from '../../../../data/caseSets/berlinModel.schema.json'
import { Concept, refToConcept } from './utils'
import AutoSelect from './AutoSelect'
import ValueSelect from './ValueSelect'
import ValueMultiSelect from './ValueMultiSelect'
import { usePrefix } from './PrefixContext'
import AutoSwitchArrayEntry from './AutoSwitchArrayEntry'

type AttributeSelectRegularProps = {
  possibleAttributes: Array<Concept>
  onRemoveAttribute: () => void
}
type AttributeSelectFixedProps = {
  fixedAttribute: Concept
}
type AttributeSelectProps =
  | AttributeSelectRegularProps
  | AttributeSelectFixedProps

const AttributeSelect: React.FC<AttributeSelectProps> = props => {
  const { watch, setValue } = useFormContext()
  const prefix = usePrefix()
  const [enabled, setEnabled] = useState(false)

  const attributeIdName = `${prefix}id`
  const attributeId = watch(attributeIdName)

  const attributeProperties =
    berlinModelSchema.definitions[attributeId]?.properties

  const possibleValueReferences =
    attributeProperties?.value?.oneOf ||
    attributeProperties?.values?.items.oneOf ||
    []

  const dereferencedPossibleValues: Array<Concept> = useMemo(
    () => possibleValueReferences.map(({ $ref }) => refToConcept($ref)),
    [possibleValueReferences],
  )

  let valuesSection = null
  if (attributeId || enabled) {
    if (attributeProperties.value) {
      valuesSection = (
        <ValueSelect name='value' possibleValues={dereferencedPossibleValues} />
      )
    } else {
      valuesSection = (
        <ValueMultiSelect
          name='values'
          possibleValues={dereferencedPossibleValues}
        />
      )
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {'fixedAttribute' in props ? (
          <AutoSwitchArrayEntry
            name='id'
            label={props.fixedAttribute.name}
            valueToSet={props.fixedAttribute.id}
            onChange={setEnabled}
            // todo: set defaultValue
          />
        ) : (
          <Box display='flex'>
            <AutoSelect
              name='id'
              label='Attribute'
              onChange={([event]): string => {
                // this watch should be redundant, but is somehow necessary to
                // force a re-render
                if (watch(attributeIdName)) {
                  if (attributeProperties.value) {
                    setValue(`${prefix}value`, undefined)
                  } else {
                    setValue(`${prefix}values`, [])
                  }
                }
                return event.target.value
              }}
            >
              {props.possibleAttributes.map(attribute => (
                <MenuItem key={attribute.id} value={attribute.id}>
                  {attribute.name}
                </MenuItem>
              ))}
            </AutoSelect>

            <IconButton onClick={props.onRemoveAttribute}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Grid>

      {/* the following hacks a 1 column offset below the md-breakpoint */}
      <Grid item xs={1} implementation='css' mdUp component={Hidden} />
      <Grid item xs={11} md={6}>
        {valuesSection}
      </Grid>
    </Grid>
  )
}

export default AttributeSelect
