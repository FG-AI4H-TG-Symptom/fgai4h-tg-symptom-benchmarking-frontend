import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'

import { CaseDataType } from '../../data/caseSets/caseDataType'
import PopulationPyramid from '../charts/PopulationPyramid'
import BiologicalSexDistribution from '../charts/BiologicalSexDistribution'

export interface CaseSetComponentProps {
  caseSet: CaseDataType[]
}

const CaseSetViewerAnalysis: React.FC<CaseSetComponentProps> = ({
  caseSet,
}) => {
  const populationInfo = useMemo(
    () =>
      caseSet.map(
        ({
          caseData: {
            profileInformation: { age, biologicalSex },
          },
        }) => ({ age, biologicalSex }),
      ),
    [caseSet],
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card variant='outlined'>
          <CardHeader title='Biological sex distribution' />
          <CardContent>
            <BiologicalSexDistribution population={populationInfo} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant='outlined'>
          <CardHeader title='Age / biological sex distribution' />
          <CardContent>
            <PopulationPyramid population={populationInfo} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CaseSetViewerAnalysis
