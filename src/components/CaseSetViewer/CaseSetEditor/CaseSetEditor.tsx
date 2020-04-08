import React, { useState } from 'react'
import {
  FormContext,
  useFieldArray,
  useForm,
  ValidationResolver,
} from 'react-hook-form'
import {
  Box,
  Button,
  ExpansionPanel,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Save as SaveIcon,
} from '@material-ui/icons'
import Ajv from 'ajv'

import { CaseDataType } from '../../../data/caseSets/caseDataType'
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'

import * as Styled from './CaseSetEditor.style'
import {
  extendWithModelInformationFromIds,
  errorsInChildren,
  errorSummary,
} from './utils'
import CaseEditor from './CaseEditor'
import AutoTextField from './AutoTextField'
import { AutoPrefix } from './PrefixContext'
import { BerlinModelCasesSchema } from '../../../data/caseSets/berlinModelTypes'

const berlinModelCasesSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
}).compile(berlinModelSchema)

const validationResolver: ValidationResolver = (
  rawValues: Partial<BerlinModelCasesSchema>,
) => {
  // todo: replace by a flexible and efficient solution
  const values = extendWithModelInformationFromIds(rawValues)

  /* eslint-disable no-param-reassign */
  // eslint-disable-next-line no-unused-expressions
  values.cases?.forEach(case_ => {
    if (case_.metaData.spreadsheetCaseId?.length === 0) {
      delete case_.metaData.spreadsheetCaseId
    }
    if (case_.metaData.caseCreator?.length === 0) {
      delete case_.metaData.caseCreator
    }
    // eslint-disable-next-line no-unused-expressions
    case_.caseData.presentingComplaints?.forEach(presentingComplaint => {
      presentingComplaint.attributes = presentingComplaint.attributes || []
    })
    case_.caseData.otherFeatures = case_.caseData.otherFeatures || []
    // eslint-disable-next-line no-unused-expressions
    case_.caseData.otherFeatures?.forEach(otherFeature => {
      otherFeature.attributes = otherFeature.attributes || []
    })
    case_.valuesToPredict.impossibleConditions =
      case_.valuesToPredict.impossibleConditions || []
    case_.valuesToPredict.otherRelevantDifferentials =
      case_.valuesToPredict.otherRelevantDifferentials || []
  })
  /* eslint-enable no-param-reassign */
  // end-todo

  const errors = {}
  if (!berlinModelCasesSchemaValidator(values)) {
    berlinModelCasesSchemaValidator.errors.forEach(error => {
      // todo: make certain errors more human readable
      errors[error.dataPath.replace(/^\./, '')] = error.message
    })
  }

  return { values, errors }
}

export interface CaseSetEditorProps {
  caseSet: CaseDataType[]
}

// todo: hydrate form from data
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const CaseSetEditor: React.FC<CaseSetEditorProps> = ({ caseSet }) => {
  const methods = useForm<BerlinModelCasesSchema>({
    validationResolver,
    defaultValues: {
      cases: [],
    },
  })
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    errors,
    formState,
    getValues,
  } = methods

  const cases = useFieldArray({
    control,
    name: 'cases',
    keyName: 'key',
  })
  const [openExpansionPanelId, setOpenExpansionPanelId] = useState(null)

  const onSubmit = (data): void => {
    // todo: store data
    // eslint-disable-next-line no-console
    console.log('submit', data)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <Box margin={2}>
        <Alert variant='outlined' severity='warning'>
          The editor is already using the Berlin model.
        </Alert>
      </Box>
      <Box margin={2}>
        <Alert variant='outlined' severity='warning'>
          The editor is currently a demo only – it doesn&apos;t load the actual
          data and you cannot save.
        </Alert>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.SaveFab color='primary' aria-label='save' type='submit'>
          <SaveIcon />
        </Styled.SaveFab>

        <Box margin={2}>
          <AutoTextField
            name='caseSetName'
            label='Case set name'
            type='text'
            autoComplete='off'
          />
        </Box>

        {cases.fields.map((item, index) => {
          const caseName = `cases[${index}]`
          const caseErrors = errorsInChildren(caseName, errors)
          const caseHasErrors = caseErrors.length > 0
          const caseIsExpanded =
            caseHasErrors || openExpansionPanelId === item.key
          return (
            <ExpansionPanel
              key={item.key}
              expanded={caseIsExpanded}
              onChange={(event, shouldExpand): void => {
                if (caseHasErrors) {
                  // todo: show snackbar to inform users they can't close the case
                } else {
                  setOpenExpansionPanelId(shouldExpand ? item.key : null)
                }
              }}
            >
              <Styled.VerticallyCenteredExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                IconButtonProps={{ disabled: caseHasErrors }}
              >
                <Styled.ExpansionPanelTitleContainer>
                  <Typography>Case #{index + 1}</Typography>
                  <Styled.ExpansionPanelSubtitle color='textSecondary'>
                    {watch(`${caseName}.caseId`)}
                  </Styled.ExpansionPanelSubtitle>
                </Styled.ExpansionPanelTitleContainer>
                {!caseIsExpanded ? (
                  <Box>
                    <Typography color='textSecondary'>
                      {getValues()[`${caseName}.metaData.description`] || (
                        <span>&nbsp;</span>
                      )}
                    </Typography>
                    <Styled.ExpansionPanelSubtitle color='textSecondary'>
                      {
                        getValues()[
                          `${caseName}.caseData.presentingComplaints[0].id`
                        ]
                      }
                    </Styled.ExpansionPanelSubtitle>
                  </Box>
                ) : null}
                <Styled.ExpansionPanelAdditionalButtons>
                  {caseHasErrors ? (
                    <Tooltip title={errorSummary(caseName, caseErrors)}>
                      <WarningIcon color='error' />
                    </Tooltip>
                  ) : null}
                  <IconButton onClick={(): void => cases.remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Styled.ExpansionPanelAdditionalButtons>
              </Styled.VerticallyCenteredExpansionPanelSummary>
              <Styled.ExpansionPanelDetailsVertical>
                <AutoPrefix name={`cases[${index}]`}>
                  <CaseEditor />
                </AutoPrefix>
              </Styled.ExpansionPanelDetailsVertical>
            </ExpansionPanel>
          )
        })}
        <Box padding={2}>
          {formState.isSubmitted && cases.fields.length === 0 ? (
            <Alert variant='outlined' severity='error'>
              Add at least one case
            </Alert>
          ) : null}
          <Button
            onClick={(): void => {
              cases.append({})
              setTimeout(() => {
                setValue(
                  // this is not off-by-one! the reference is (somehow) not updated!
                  `cases[${cases.fields.length}].caseId`,
                  Math.random()
                    .toString()
                    .split('.')[1],
                )
              }, 0)
            }}
          >
            Add case
          </Button>
        </Box>
      </form>
    </FormContext>
  )
}

export default CaseSetEditor
