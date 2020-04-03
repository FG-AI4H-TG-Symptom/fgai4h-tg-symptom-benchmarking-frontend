import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'
import { refToConcept, watchArrayHelper } from './utils'

import AttributeSelect from './AttributeSelect'
import FormBlock from './FormBlock'

let renderCount = 0

const ClinicalFindingSelect = ({ name, onChange }) => {
  // , value
  const validationResolver = (rawValues: any) => {
    console.log('ClinicalFindingSelect.validationResolver', rawValues)
    onChange({ value: rawValues })
    return { values: rawValues, errors: {} }
  }
  const { control, watch } = useForm({ mode: 'onChange', validationResolver })

  const attributes = useFieldArray({
    control,
    name: 'attributes',
    keyName: 'key',
  })
  const clinicalFindingId = watch('id')
  let attributesSection
  if (clinicalFindingId) {
    const clinicalFindingProperties =
      berlinModelSchema.definitions[clinicalFindingId].properties

    if (clinicalFindingProperties.attributes) {
      const possibleAttributes = clinicalFindingProperties.attributes.items.oneOf.map(
        ({ $ref }) => refToConcept($ref),
      )

      if (possibleAttributes.length < 4) {
        attributesSection = (
          <FormBlock group color='white' title='Attributes'>
            {possibleAttributes.map((attribute, index) => (
              <FormBlock key={attribute.id} color='white'>
                <Controller
                  name={`attributes[${index}]`}
                  fixedAttribute={attribute}
                  as={AttributeSelect}
                  control={control}
                />
              </FormBlock>
            ))}
          </FormBlock>
        )
      } else {
        const currentAttributes = watch('attributes')
        const currentAttributeIds = currentAttributes
          ? currentAttributes.map(({ id }) => id)
          : []
        // todo: the following doesn't work, but the (apparently) same code works in AttributeSelect for 'values'
        // const currentAttributeIds = watchArrayHelper(
        //   watch,
        //   attributes,
        //   'attributes[*].id',
        // )

        attributesSection = (
          <FormBlock group color='white' title='Attributes'>
            {attributes.fields.map((item, index) => (
              <FormBlock key={item.key} color='white'>
                <Controller
                  name={`attributes[${index}]`}
                  possibleAttributes={possibleAttributes.filter(
                    ({ id }) =>
                      id === currentAttributeIds[index] ||
                      !currentAttributeIds.includes(id),
                  )}
                  onRemoveAttribute={(): void => attributes.remove(index)}
                  as={AttributeSelect}
                  control={control}
                />
              </FormBlock>
            ))}

            {currentAttributeIds.length < possibleAttributes.length ? (
              <Button onClick={(): void => attributes.append({})}>
                Add attribute
              </Button>
            ) : null}
          </FormBlock>
        )
      }
    } else {
      attributesSection = <Typography>No attributes</Typography>
    }
  } else {
    attributesSection = (
      <Typography>Start by selecting a clinical finding</Typography>
    )
  }

  renderCount += 1
  console.log('clinical finding render', renderCount)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4}>
        <FormControl fullWidth>
          <InputLabel id={`${name}__label`}>Clinical finding</InputLabel>
          <Controller
            name='id'
            control={control}
            defaultValue=''
            labelId={`${name}__label`}
            onChange={([event]): string => {
              attributes.remove()
              return event.target.value
            }}
            as={
              <Select>
                {berlinModelSchema.definitions.clinicalFinding.oneOf.map(
                  ({ $ref }) => {
                    const clinicalFinding = refToConcept($ref)
                    return (
                      <MenuItem
                        key={clinicalFinding.id}
                        value={clinicalFinding.id}
                      >
                        {clinicalFinding.name}
                      </MenuItem>
                    )
                  },
                )}
              </Select>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={8}>
        {attributesSection}
      </Grid>
    </Grid>
  )
}

export default ClinicalFindingSelect
