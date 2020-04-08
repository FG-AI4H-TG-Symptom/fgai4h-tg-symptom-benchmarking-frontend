import React from 'react'
import { Button, Grid, MenuItem, Typography } from '@material-ui/core'

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'

import {
  refToConcept,
  useAutoFieldArray,
  useWatch,
  useWatchArrayHelper,
} from './utils'
import AttributeSelect from './AttributeSelect'
import FormBlock from './FormBlock'
import AutoSelect from './AutoSelect'

const ClinicalFindingSelect: React.FC<{}> = () => {
  const attributes = useAutoFieldArray({
    name: 'attributes',
  })
  const clinicalFindingId = useWatch<string>('id')
  const currentAttributeIds = useWatchArrayHelper(
    attributes,
    'attributes[*].id',
  )

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
          <FormBlock name='attributes' group color='#4cb8da' title='Attributes'>
            {possibleAttributes.map((attribute, index) => (
              <FormBlock name={`[${index}]`} key={attribute.id} color='white'>
                <AttributeSelect fixedAttribute={attribute} />
              </FormBlock>
            ))}
          </FormBlock>
        )
      } else {
        attributesSection = (
          <FormBlock name='attributes' group color='#4cb8da' title='Attributes'>
            {attributes.fields.map((item, index) => (
              <FormBlock name={`[${index}]`} key={item.key} color='#4cb8da'>
                <AttributeSelect
                  possibleAttributes={possibleAttributes.filter(
                    ({ id }) =>
                      id === currentAttributeIds[index] ||
                      !currentAttributeIds.includes(id),
                  )}
                  onRemoveAttribute={(): void => {
                    attributes.remove(index)
                  }}
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} lg={3}>
        <AutoSelect
          name='id'
          label='Clinical finding'
          onChange={([event]): string => {
            attributes.remove()
            return event.target.value
          }}
        >
          {berlinModelSchema.definitions.clinicalFinding.oneOf.map(
            ({ $ref }) => {
              const clinicalFinding = refToConcept($ref)
              return (
                <MenuItem key={clinicalFinding.id} value={clinicalFinding.id}>
                  {clinicalFinding.name}
                </MenuItem>
              )
            },
          )}
        </AutoSelect>
      </Grid>
      <Grid item xs={4} lg={2}>
        <AutoSelect name='state' label='State'>
          {berlinModelSchema.definitions.clinicalFindingState.enum.map(
            state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ),
          )}
        </AutoSelect>
      </Grid>
      <Grid item xs={12} lg={7}>
        {attributesSection}
      </Grid>
    </Grid>
  )
}

export default ClinicalFindingSelect
