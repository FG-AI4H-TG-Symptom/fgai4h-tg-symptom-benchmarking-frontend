import React from 'react'

import * as Styled from './TextPageWrapper.style'

const TextPageWrapper: React.FC<{}> = ({ children }) => (
  <Styled.FlexContainer>
    <Styled.Centered>{children}</Styled.Centered>
  </Styled.FlexContainer>
)

export default TextPageWrapper
