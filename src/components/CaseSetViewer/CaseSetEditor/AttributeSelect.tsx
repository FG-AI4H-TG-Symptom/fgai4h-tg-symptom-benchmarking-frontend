import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  MenuItem,
  Switch,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'
import { Concept, refToConcept, sanitizeForId } from './utils'
import AutoSelect from './AutoSelect'
import ValueSelect from './ValueSelect'
import ValueMultiSelect from './ValueMultiSelect'
import { usePrefix } from './PrefixContext'

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
  const { register, watch, setValue } = useFormContext()
  const prefix = usePrefix()

  const attributeId =
    'fixedAttribute' in props ? props.fixedAttribute.id : watch(`${prefix}id`)

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

  const enabledFieldName = sanitizeForId(`${prefix}__enabled`)

  let valuesSection = null
  if (
    attributeId &&
    (!('fixedAttribute' in props) || watch(enabledFieldName))
  ) {
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
          <FormControlLabel
            control={<Switch inputRef={register} name={enabledFieldName} />}
            label={props.fixedAttribute.name}
          />
        ) : (
          <Box display='flex'>
            <AutoSelect
              name='id'
              label='Attribute'
              onChange={([event]): string => {
                // this watch should be redundant, but is somehow necessary to
                // force a re-render
                /* todo: clear current values? what happens when a symptom with
                   `values` is replace by one with `value` and vice versa? */
                if (watch(`${prefix}id`)) {
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
