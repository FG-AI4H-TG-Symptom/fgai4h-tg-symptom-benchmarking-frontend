import React from 'react'

import * as Styled from './TextPageWrapper.style'

export enum PageWidth {
  ULTRA_NARROW = 'ULTRA_NARROW',
  NARROW = 'NARROW',
  REGULAR = 'REGULAR',
  WIDE = 'WIDE',
}

const PageWrapper: React.FC<{ pageWidth?: PageWidth }> = ({
  children,
  pageWidth = PageWidth.REGULAR,
}) => (
  <Styled.CenteredContainer>
    <Styled.Centered pageWidth={pageWidth}>{children}</Styled.Centered>
  </Styled.CenteredContainer>
)

export default PageWrapper
