import React from 'react'
import styled from 'styled-components'

const FormBlockContainer = styled.div<{ color: string; group: boolean }>`
  border-left: 2px solid ${({ color }): string => color};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: ${({ group }): number => (group ? 0.2 : 1)}rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`
const FormBlockTitle = styled.div<{ color: string }>`
  color: ${({ color }): string => color};
  text-transform: uppercase;
  margin-bottom: 0.1rem;
`
const FormBlockFlexChildren = styled.div`
  display: flex;
  align-items: flex-start;
`

const FormBlock: React.FC<{
  color: string
  title?: string
  group?: boolean
}> = ({ color, title, group, children }) => (
  <>
    <FormBlockTitle color={color}>{title}</FormBlockTitle>
    <FormBlockContainer color={color} group={Boolean(group)}>
      {group ? (
        children
      ) : (
        <FormBlockFlexChildren>{children}</FormBlockFlexChildren>
      )}
    </FormBlockContainer>
  </>
)

export default FormBlock
