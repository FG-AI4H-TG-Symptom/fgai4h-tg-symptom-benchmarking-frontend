import React from 'react'

import * as Styled from './LinkWrapper.style'

const LinkWrapper: React.FC<{ to: string }> = ({ to, children }) => (
  <Styled.UndecoratedLink to={to}>{children}</Styled.UndecoratedLink>
)

export default LinkWrapper
