import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import { ArrowForward as StartIcon } from '@material-ui/icons'
import { useForm, ValidationResolver } from 'react-hook-form'

import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'
import { CaseSetInfo } from '../../data/caseSetList/caseSetDataType'
import { CreateBenchmarkManagerParameters } from '../../data/benchmarks/benchmarkActions'
import ErrorIndicator from '../util/ErrorIndicator'

interface FormData {
  aiImplementations: boolean[]
  caseSetId: string
}

const validationResolver: ValidationResolver = (values: FormData) => {
  const errors: { [fieldName in keyof FormData]?: string } = {}
  if (!values.caseSetId) {
    errors.caseSetId = 'Select a case set'
  }
  if (!values.aiImplementations.some(aiImplementation => aiImplementation)) {
    errors.aiImplementations = 'Select at least one AI implementation'
  }
  return { values, errors }
}

interface BenchmarkCreatorComponentProps {
  aiImplementations: {
    [name: string]: AiImplementationInfo
  }
  caseSetList: CaseSetInfo[]
  defaultCaseSetId: string | null
  onCreateBenchmark: (
    benchmarkParameters: CreateBenchmarkManagerParameters,
  ) => void
}

const BenchmarkCreatorComponent: React.FC<BenchmarkCreatorComponentProps> = ({
  aiImplementations,
  caseSetList,
  defaultCaseSetId,
  onCreateBenchmark,
}) => {
  const { register, handleSubmit, errors, watch } = useForm<FormData>({
    validationResolver,
    defaultValues: {
      aiImplementations: Object.keys(aiImplementations).map(() => true),
      caseSetId: defaultCaseSetId,
    },
  })

  const onSubmit = ({
    caseSetId,
    aiImplementations: selectedAiImplementations,
  }: FormData): void => {
    onCreateBenchmark({
      caseSetId,
      aiImplementationNames: Object.keys(aiImplementations).filter(
        (_, index) => selectedAiImplementations[index],
      ),
    })
  }

  const aiImplementationsSelectedCount = watch('aiImplementations')?.filter(
    x => x,
  ).length

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title='Case set'
              subheader={`${caseSetList.length} available`}
              action={<ErrorIndicator error={errors.caseSetId} />}
            />
            <CardContent>
              <FormControl
                component='fieldset'
                error={Boolean(errors.caseSetId)}
              >
                <RadioGroup
                  aria-label='case set'
                  defaultValue={defaultCaseSetId}
                >
                  {caseSetList.map(({ id }) => (
                    <FormControlLabel
                      key={id}
                      value={id}
                      control={<Radio name='caseSetId' inputRef={register} />}
                      label={id}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>Select exactly one</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title='AI implementations'
              subheader={`${aiImplementationsSelectedCount} selected, ${
                Object.keys(aiImplementations).length
              } available`}
              action={<ErrorIndicator error={errors.aiImplementations} />}
            />
            <CardContent>
              <FormControl
                component='fieldset'
                error={Boolean(errors.aiImplementations)}
              >
                <FormGroup>
                  {Object.values(aiImplementations).map(({ name }, index) => (
                    <FormControlLabel
                      key={name}
                      control={<Checkbox defaultChecked />}
                      label={name}
                      name={`aiImplementations[${index}]`}
                      inputRef={register}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Select at least one</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box display='flex' justifyContent='flex-end' marginTop={4}>
        <Button
          variant='contained'
          color='primary'
          endIcon={<StartIcon />}
          type='submit'
        >
          Run benchmark
        </Button>
      </Box>
    </form>
  )
}

export default BenchmarkCreatorComponent
