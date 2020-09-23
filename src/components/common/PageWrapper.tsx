import React from 'react';

import * as Styled from './TextPageWrapper.style';

export { PageWidth } from './TextPageWrapper.style';

const PageWrapper: React.FC<{ pageWidth?: Styled.PageWidth }> = ({
  children,
  pageWidth = Styled.PageWidth.REGULAR,
}) => (
  <Styled.CenteredContainer>
    <Styled.Centered pageWidth={pageWidth}>{children}</Styled.Centered>
  </Styled.CenteredContainer>
);

export default PageWrapper;
