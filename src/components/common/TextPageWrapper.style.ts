import styled from 'styled-components'

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Centered = styled.div<{ narrow: boolean }>`
  max-width: ${({ narrow }): number => (narrow ? 30 : 50)}rem;
`
