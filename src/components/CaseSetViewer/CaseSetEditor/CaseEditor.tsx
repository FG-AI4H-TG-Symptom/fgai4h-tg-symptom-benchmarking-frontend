import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Grid, MenuItem, TextField } from '@material-ui/core'

import FormSection from './FormSection'
import FormBlock from './FormBlock'
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'
import ClinicalFindingSelect from './ClinicalFindingSelect'
import { FlatErrors } from './utils'
import AutoTextField from './AutoTextField'
import AutoSelect from './AutoSelect'

interface CaseEditorProps {
  name: string
  onChange: (data: object) => void
  errors: FlatErrors
  value: object
}

const CaseEditor: React.FC<CaseEditorProps> = ({
  name: prefix,
  onChange,
  errors,
  value,
}) => {
  console.log('CaseEditor.value', value)

  const validationResolver = (rawValues: any) => {
    onChange({ value: rawValues })
    return { values: rawValues, errors: {} }
  }
  const { register, control } = useForm({
    mode: 'onChange',
    validationResolver,
  })

  return (
    <>
      <FormSection title='Meta data' name='metaData' errors={errors}>
        <AutoTextField
          register={register}
          label='Case description'
          type='text'
          name='metaData.description'
          errors={errors}
        />
      </FormSection>

      <FormSection title='Case data' name='caseData' errors={errors}>
        <FormBlock color='navy' title='Profile information'>
          <Grid container spacing={2}>
            <Grid item xs={3} md={2} lg={1}>
              <TextField
                inputRef={register}
                name='caseData.profileInformation.age'
                type='number'
                label='Age'
                error={Boolean(errors[`caseData.profileInformation.age`])}
                helperText={errors[`caseData.profileInformation.age`]}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <AutoSelect
                control={control}
                label='Biological sex'
                name='caseData.profileInformation.biologicalSex'
                prefix={prefix}
                errors={errors}
              >
                {berlinModelSchema.definitions.biologicalSex.enum.map(
                  biologicalSex => (
                    <MenuItem key={biologicalSex} value={biologicalSex}>
                      {biologicalSex}
                    </MenuItem>
                  ),
                )}
              </AutoSelect>
            </Grid>
          </Grid>
        </FormBlock>
        <FormBlock color='green' title='Presenting complaint'>
          <Controller
            name='caseData.presentingComplaints[0]'
            as={ClinicalFindingSelect}
            control={control}
          />
        </FormBlock>
      </FormSection>
    </>
  )
}

export default CaseEditor
