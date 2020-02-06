import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
} from '@material-ui/core'

import TextPageWrapper from '../util/TextPageWrapper'

const LandingPageComponent: React.FC<{}> = () => (
  <TextPageWrapper>
    <Typography variant='h1'>
      &quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)
    </Typography>
    <Box marginTop={2} marginBottom={4}>
      <Typography gutterBottom>
        Minimal minimal viable benchmark for &quot;Symptom assessment&quot;
        sub-group of &quot;AI for Health&quot; Focus Group
      </Typography>
      <Typography gutterBottom>
        The sub-group of the focus group of the International Telecommunication
        Union
      </Typography>
      <Typography>
        The focus group is organised in collaboration with the World Health
        Organisation
      </Typography>
    </Box>
    <Box marginBottom={2}>
      <Card>
        <CardHeader title='Note' />
        <CardContent>
          <Box marginBottom={1}>
            <Typography>
              This is the minimal minimal viable benchmark designed and
              developed by the members of the sub-group (topic group) “Symptom
              assessment”, which is the part of the ITU focus group “Artificial
              Intelligence for Health”.
              <br />
              The minimal minimal viable benchmark is a prototype and does not
              reflect in any possible way real methods, techniques, approaches,
              etc. that the members (including commercial companies) use in
              their products.
            </Typography>
          </Box>
          <Typography>
            {' '}
            As mentioned on the focus group website: “The ITU/WHO Focus Group on
            artificial intelligence for health (FG-AI4H) works in partnership
            with the World Health Organization (WHO) to establish a standardized
            assessment framework for the evaluation of AI-based methods for
            health, diagnosis, triage or treatment decisions. Participation in
            the FG-AI4H is free of charge and open to all.”
          </Typography>
        </CardContent>
      </Card>
    </Box>
    <Card>
      <CardHeader title='Copyright and Licence' />
      <CardContent>
        <Box marginBottom={1}>
          <Typography>
            Copyright, 2019, created jointly by the members of the ITU sub-group
            (topic group) &quot;Symptom assessment&quot; of the International
            Telecommunication Union focus group “Artificial Intelligence for
            Health”, which works in partnership with the World Health
            Organization.
          </Typography>
        </Box>
        <Box marginBottom={1}>
          <Typography>
            All parts of this benchmark are free software: you can redistribute
            them and/or modify them under the terms of the GNU General Public
            License as published by the Free Software Foundation, either version
            3 of the License, or (at your option) any later version.
          </Typography>
        </Box>
        <Box marginBottom={1}>
          <Typography>
            They are distributed in the hope that it will be useful, but WITHOUT
            ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
            or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
            License for more details.
          </Typography>
        </Box>
        <Box>
          <Typography>
            You should have received a copy of the GNU General Public License
            along with this program. If not, see https://www.gnu.org/licenses/.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </TextPageWrapper>
)

export default LandingPageComponent
