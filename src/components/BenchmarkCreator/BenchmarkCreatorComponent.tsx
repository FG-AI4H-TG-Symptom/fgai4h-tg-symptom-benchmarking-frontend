import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { ArrowForward as StartIcon } from '@material-ui/icons'

import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'
import { CaseSetInfo } from '../../data/caseSetList/caseSetDataType'
import { CreateBenchmarkManagerParameters } from '../../data/benchmarks/benchmarkActions'

interface AiImplementationManagerComponentProps {
  aiImplementations: {
    [name: string]: AiImplementationInfo
  }
  caseSetList: CaseSetInfo[]
  defaultCaseSetId: string | null
  onCreateBenchmark: (
    benchmarkParameters: CreateBenchmarkManagerParameters,
  ) => void
}

const BenchmarkCreatorComponent: React.FC<AiImplementationManagerComponentProps> = ({
  aiImplementations,
  caseSetList,
  defaultCaseSetId,
  onCreateBenchmark,
}) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title='Case set'
            subheader={`${caseSetList.length} available`}
          />
          <CardContent>
            <RadioGroup aria-label='case set' name='case-set'>
              {caseSetList.map(({ id }) => (
                <Box key={id} display='flex' alignItems='center'>
                  <Radio
                    checked={id === (defaultCaseSetId || caseSetList[0].id)}
                    disabled
                  />
                  <Typography>{id}</Typography>
                </Box>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title='AI implementations'
            subheader={`${Object.keys(aiImplementations).length} available`}
          />
          <CardContent>
            {Object.values(aiImplementations).map(({ name }) => (
              <Box key={name} display='flex' alignItems='center'>
                <Checkbox defaultChecked disabled />
                <Typography>{name}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Box display='flex' justifyContent='flex-end' marginTop={4}>
      {/* todo: integrate form (select package); pass data from form to callback-prop here */}
      <Button
        variant='contained'
        color='primary'
        endIcon={<StartIcon />}
        onClick={(): void => {
          onCreateBenchmark({
            caseSetId: defaultCaseSetId || caseSetList[0].id,
            aiImplementationNames: Object.keys(aiImplementations),
          })
        }}
      >
        Run benchmark
      </Button>
    </Box>
  </>
)

export default BenchmarkCreatorComponent
