import React from 'react'

import * as Styled from './TextPageWrapper.style'

const TextPageWrapper: React.FC<{ narrow?: boolean }> = ({
  children,
  narrow = false,
}) => (
  <Styled.FlexContainer>
    <Styled.Centered narrow={narrow}>{children}</Styled.Centered>
  </Styled.FlexContainer>
)

export default TextPageWrapper
