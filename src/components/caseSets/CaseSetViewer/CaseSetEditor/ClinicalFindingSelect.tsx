import React, { useMemo } from 'react'
import { Box, Grid, IconButton, MenuItem, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import berlinModelSchema from '../../../../data/caseSets/berlinModel.schema.json'
import FormBlock from '../../../forms/FormBlock'
import AutoSelect from '../../../forms/AutoSelect'
import AutoArrayFormBlock, {
  ArrayFormComponentProps,
} from '../../../forms/AutoArrayFormBlock'
import { useWatch } from '../../../forms/utils'

import AttributeSelect from './AttributeSelect'
import { ConceptSelectionProps, refToConcept } from './utils'
import { BaseNamedConcept } from '../../../../data/util/baseConceptTypes'

const ClinicalFindingSelect: React.FC<
  ConceptSelectionProps | ArrayFormComponentProps
> = ({ possibleValues, ...props }) => {
  const clinicalFindingId = useWatch<string>('id')

  const possibleAttributes = useMemo<Array<BaseNamedConcept>>(
    () =>
      berlinModelSchema.definitions[
        clinicalFindingId
      ]?.properties.attributes.items?.oneOf.map(({ $ref }) =>
        refToConcept($ref),
      ) || [],
    [clinicalFindingId],
  )

  let attributesSection
  if (clinicalFindingId) {
    const clinicalFindingProperties =
      berlinModelSchema.definitions[clinicalFindingId].properties

    if (clinicalFindingProperties.attributes.items) {
      if (possibleAttributes.length < 4) {
        attributesSection = (
          <FormBlock name='attributes' group color='#4cb8da' title='Attributes'>
            {possibleAttributes.map((attribute, index) => (
              <FormBlock name={`[${index}]`} key={attribute.id} color='#4cb8da'>
                <AttributeSelect
                  fixedAttribute={attribute}
                  possibleValues={possibleAttributes}
                />
              </FormBlock>
            ))}
          </FormBlock>
        )
      } else {
        attributesSection = (
          <AutoArrayFormBlock
            title='Attributes'
            name='attributes'
            color='#4cb8da'
            formComponent={AttributeSelect}
            possibleValues={possibleAttributes}
          />
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
      <Grid item xs={12} sm={8} lg={3}>
        <AutoSelect name='id' label='Clinical finding'>
          {(possibleValues as BaseNamedConcept[]).map(clinicalFinding => (
            <MenuItem key={clinicalFinding.id} value={clinicalFinding.id}>
              {clinicalFinding.name}
            </MenuItem>
          ))}
        </AutoSelect>
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <Box display='flex'>
          <AutoSelect name='state' label='State'>
            {berlinModelSchema.definitions.clinicalFindingState.enum.map(
              state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ),
            )}
          </AutoSelect>

          {'onRemove' in props ? (
            <IconButton onClick={props.onRemove}>
              <DeleteIcon />
            </IconButton>
          ) : null}
        </Box>
      </Grid>

      <Grid item xs={12} lg={7}>
        {attributesSection}
      </Grid>
    </Grid>
  )
}

export default ClinicalFindingSelect
