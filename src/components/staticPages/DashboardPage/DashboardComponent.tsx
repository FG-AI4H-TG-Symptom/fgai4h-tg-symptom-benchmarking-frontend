import React from 'react'
import { Grid } from '@material-ui/core'

import styled from 'styled-components'
import { paths } from '../../../routes'
import DashboardCard from './DashboardCard'
import useDataStateLoader from '../../util/useDataStateLoader'

import { aiImplementationOverviewDataAction } from '../../../data/aiImplementations/aiImplementationsActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'

import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import { BenchmarkingSession } from '../../../data/benchmarks/benchmarkManagerDataType'

import { benchmarkingSessionListDataAction } from '../../../data/benchmarks/benchmarkActions'
import { caseSetListDataActions } from '../../../data/caseSets/caseSetActions'

const LandingPageComponent: React.FC<{}> = () => {
  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationOverviewDataAction.load({
      withHealth: false,
    }),
  )
  const caseSets = useDataStateLoader<CaseSetInfo[]>(
    'caseSets',
    caseSetListDataActions.load(),
  )

  const benchmarkingSessions = useDataStateLoader<BenchmarkingSession[]>(
    'benchmark',
    benchmarkingSessionListDataAction.load(),
  )

  const numberOfAIs =
    aiImplementationList.state === 'READY'
      ? aiImplementationList.data.length
      : 0
  const numberOfCases = caseSets.state === 'READY' ? caseSets.data.length : 0
  const numberOfBenchmarking =
    benchmarkingSessions.state === 'READY'
      ? benchmarkingSessions.data.length
      : 0

  const section = {
    height: '100%',
    paddingTop: 5,
  }

  const StyledContainer = styled.div`
    padding: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
  `
  /* eslint-disable global-require */
  const image1 = require('../../../images/rept1.jpeg')
  const image2 = require('../../../images/rept2.jpeg')
  const image3 = require('../../../images/rept3.jpeg')
  /* eslint-enable global-require */

  return (
    <StyledContainer>
      <Grid container spacing={2} alignItems='center' justify='center'>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title='AI Implementations'
              count={numberOfAIs}
              link={paths.aiImplementationManager()}
              image={image1}
              addNewLink={paths.aiImplementationRegistration()}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title='Datasets'
              count={numberOfCases}
              link={paths.caseSetManager()}
              image={image2}
              addNewLink={paths.caseSetCreator()}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title='Benchmarking Sessions'
              count={numberOfBenchmarking}
              link={paths.benchmarkingSessions()}
              image={image3}
              addNewLink={paths.benchmarkCreate()}
            />
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  )
}

export default LandingPageComponent
