import styled from "styled-components";
import React from "react";

export const FormBlockContainer = styled.div<{ color: string }>`
  border-left: 2px solid ${({ color }): string => color};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: ${1}rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const FormBlockTitle = styled.div<{ color: string }>`
  color: ${({ color }): string => color};
  text-transform: uppercase;
  margin-bottom: 0.1rem;
`;

export const FormBlockFlexChildren = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const FormBlock: React.FC<any> = ({ color, title, children }) => {
  return (
    <>
      <FormBlockTitle color={color}>{title}</FormBlockTitle>
      <FormBlockContainer color={color}>
        {/* <FormBlockFlexChildren>{children}</FormBlockFlexChildren> */}
        {children}
      </FormBlockContainer>
    </>
  );
};
