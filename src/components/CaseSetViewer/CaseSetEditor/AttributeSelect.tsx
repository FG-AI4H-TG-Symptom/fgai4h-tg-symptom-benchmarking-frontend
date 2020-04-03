import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'
import { Concept, refToConcept, watchArrayHelper } from './utils'

const ValueSelect = ({ name, control, possibleValues, prefix }) => {
  const possibleValueDefinitions = possibleValues.map(({ $ref }) =>
    refToConcept($ref),
  )

  return (
    <FormControl fullWidth>
      <InputLabel id={`${prefix}__value__label`}>Value</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        labelId={`${prefix}__value__label`}
        as={
          <Select>
            {possibleValueDefinitions.map(value => (
              <MenuItem key={value.id} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  )
}

const ValueMultiSelect = ({ control, possibleValues, watch, prefix }) => {
  const values = useFieldArray({
    control,
    name: 'values',
    keyName: 'key',
  })

  const currentValueIds = watchArrayHelper(watch, values, 'values[*].id')

  return (
    <>
      {values.fields.map((item, index) => (
        <Box display='flex' key={item.key}>
          <ValueSelect
            name={`values[${index}].id`}
            control={control}
            prefix={`${prefix}__${index}`}
            possibleValues={possibleValues.filter(({ $ref }) => {
              const id = $ref.split('/')[2]
              return (
                id === currentValueIds[index] || !currentValueIds.includes(id)
              )
            })}
          />
          <IconButton onClick={(): void => values.remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={(): void => values.append({})}>Add value</Button>
    </>
  )
}

type AttributeSelectRegularProps = {
  possibleAttributes: Array<Concept>
  onRemoveAttribute: () => void
}
type AttributeSelectFixedProps = {
  fixedAttribute: Concept
}
type AttributeSelectProps = {
  name: string
  onChange: (data: object) => void
} & (AttributeSelectRegularProps | AttributeSelectFixedProps)

const AttributeSelect: React.FC<AttributeSelectProps> = props => {
  const { onChange, name } = props

  const validationResolver = (rawValues: any) => {
    console.log('AttributeSelect.validationResolver', rawValues)
    onChange({ value: rawValues })
    return { values: rawValues, errors: {} }
  }
  const { control, register, watch } = useForm({
    mode: 'onChange',
    validationResolver,
  })

  // todo: check if symptom even has attributes; if no remove currently existing attributes (always remove on change?)

  let valuesSection = null

  if (!('fixedAttribute' in props) || watch('__enabled')) {
    const attributeId =
      'fixedAttribute' in props ? props.fixedAttribute.id : watch('id')
    if (attributeId) {
      const attributeProperties =
        berlinModelSchema.definitions[attributeId].properties
      if (attributeProperties.value) {
        valuesSection = (
          <ValueSelect
            name='value.id'
            control={control}
            possibleValues={attributeProperties.value.oneOf}
            prefix={name}
          />
        )
      } else {
        valuesSection = (
          <ValueMultiSelect
            prefix={name}
            control={control}
            watch={watch}
            possibleValues={attributeProperties.values.items.oneOf}
          />
        )
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {'fixedAttribute' in props ? (
          <FormControlLabel
            control={<Switch inputRef={register} name='__enabled' />}
            label={props.fixedAttribute.name}
          />
        ) : (
          <Box display='flex'>
            <FormControl fullWidth>
              <InputLabel id={`${name}__label`}>Attribute</InputLabel>
              <Controller
                name='id'
                control={control}
                defaultValue=''
                labelId={`${name}__label`}
                as={
                  <Select>
                    {props.possibleAttributes.map(attribute => (
                      <MenuItem key={attribute.id} value={attribute.id}>
                        {attribute.name}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            </FormControl>

            <IconButton onClick={props.onRemoveAttribute}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        {valuesSection}
      </Grid>
    </Grid>
  )
}

export default AttributeSelect
