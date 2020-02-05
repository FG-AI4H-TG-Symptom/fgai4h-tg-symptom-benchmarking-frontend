import React from 'react'
import { CardContent } from '@material-ui/core'

import * as Styled from './LandingPageComponent.style'

const LandingPageComponent: React.FC<{}> = () => (
  <>
    <h1>&quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)</h1>
    <Styled.DefinitionCard>
      <CardContent>
        Minimal minimal viable benchmark for &quot;Symptom assessment&quot;
        sub-group of &quot;AI for Health&quot; Focus Group
      </CardContent>
    </Styled.DefinitionCard>
    <Styled.DefinitionCard>
      <CardContent>
        The sub-group of the focus group of the International Telecommunication
        Union
      </CardContent>
    </Styled.DefinitionCard>
    <Styled.DefinitionCard>
      <CardContent>
        The focus group is organised in collaboration with the World Health
        Organisation
      </CardContent>
    </Styled.DefinitionCard>
  </>
)

export default LandingPageComponent
