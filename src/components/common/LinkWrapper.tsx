import React from 'react'

import * as Styled from './LinkWrapper.style'

const LinkWrapper: React.FC<{ to: string; disabled?: boolean }> = ({
  to,
  disabled = false,
  children,
}) => (
  <Styled.UndecoratedLink to={disabled ? '' : to}>
    {children}
  </Styled.UndecoratedLink>
)

export default LinkWrapper
