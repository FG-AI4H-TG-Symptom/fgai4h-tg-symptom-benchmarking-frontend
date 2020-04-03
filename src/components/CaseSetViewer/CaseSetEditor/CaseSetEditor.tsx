import React, { useState } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  ValidationResolver,
} from 'react-hook-form'
import {
  Box,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'
import Ajv from 'ajv'

import { CaseDataType } from '../../../data/caseSets/caseDataType'
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'

import * as Styled from './CaseSetEditor.style'
import {
  extendWithModelInformationFromIds,
  FlatErrors,
  scopeErrors,
} from './utils'
import CaseEditor from './CaseEditor'
import AutoTextField from './AutoTextField'

const berlinModelCasesSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
}).compile(berlinModelSchema)

const validationResolver: ValidationResolver = (rawValues: any) => {
  console.log('CaseSetEditor.validationResolver', rawValues)

  const errors = {}
  if (!berlinModelCasesSchemaValidator(rawValues)) {
    berlinModelCasesSchemaValidator.errors.forEach(error => {
      // set(errors, error.dataPath.replace(/^\./, ''), error.message)
      errors[error.dataPath.replace(/^\./, '')] = error.message
    })
  }

  return { values: extendWithModelInformationFromIds(rawValues), errors }
}

export interface CaseSetEditorProps {
  caseSet: CaseDataType[]
}

let renderCount = 0

const CaseSetEditor: React.FC<CaseSetEditorProps> = ({ caseSet }) => {
  const { register, control, handleSubmit, watch, errors } = useForm<any>({
    validationResolver,
    defaultValues: {
      cases: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cases',
  })
  const [openExpansionPanelId, setOpenExpansionPanelId] = useState(null)

  const onSubmit = (data): void => {
    console.log('submit', data)
  }

  renderCount += 1
  console.log('full render', renderCount)

  console.log('render errors', errors)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flatErrors: FlatErrors = (errors as any) || {}

  return (
    <>
      <Box margin={2}>
        <Alert variant='outlined' severity='warning'>
          The editor is currently a demo only – it doesn&apos;t load the actual
          data and you cannot save.
        </Alert>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box margin={2} display='flex' alignItems='baseline'>
          <AutoTextField
            register={register}
            name='caseSetName'
            label='Case set name'
            type='text'
            errors={errors}
          />
          <Button type='submit'>Save</Button>
        </Box>

        {fields.map((item, index) => (
          <ExpansionPanel
            key={item.id}
            expanded={openExpansionPanelId === item.id}
            onChange={(event, isExpanded): void =>
              isExpanded
                ? setOpenExpansionPanelId(item.id)
                : setOpenExpansionPanelId(null)
            }
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Styled.ExpansionPanelTitleContainer>
                <Typography>Case #{index + 1}</Typography>
                <Styled.ExpansionPanelSubtitle color='textSecondary'>
                  {item.caseId}
                </Styled.ExpansionPanelSubtitle>
              </Styled.ExpansionPanelTitleContainer>
              {openExpansionPanelId !== item.id ? (
                <Box>
                  <Typography color='textSecondary'>
                    {watch(`cases[${index}].metaData.description`)}
                  </Typography>
                  <Typography color='textSecondary'>
                    {
                      watch(`cases[${index}].caseData.presentingComplaints[0]`)
                        ?.id
                    }
                  </Typography>
                </Box>
              ) : null}
              <Styled.ExpansionPanelDeleteButton
                onClick={(): void => remove(index)}
              >
                <DeleteIcon />
              </Styled.ExpansionPanelDeleteButton>
            </ExpansionPanelSummary>
            <Styled.ExpansionPanelDetailsVertical>
              <input
                type='hidden'
                name='caseId'
                ref={register}
                defaultValue={item.caseId}
              />
              <Controller
                control={control}
                name={`cases[${index}]`}
                errors={scopeErrors(flatErrors, `cases[${index}]`)}
                as={CaseEditor}
              />
            </Styled.ExpansionPanelDetailsVertical>
          </ExpansionPanel>
        ))}
        <Box padding={2} display='flex'>
          <Button
            onClick={(): void =>
              append({
                caseId: Math.random()
                  .toString()
                  .split('.')[1],
                metaData: {},
              })
            }
          >
            Add case
          </Button>
        </Box>
      </form>
    </>
  )
}

export default CaseSetEditor
