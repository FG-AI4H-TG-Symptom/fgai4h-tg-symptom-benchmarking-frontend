import React from "react";
import styled from "styled-components";
import { AutoPrefix } from "./PrefixContext";

const FormBlockContainer = styled.div<{ color: string; group: boolean }>`
  border-left: 2px solid ${({ color }): string => color};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: ${({ group }): number => (group ? 0.2 : 1)}rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const FormBlockTitle = styled.div<{ color: string }>`
  color: ${({ color }): string => color};
  text-transform: uppercase;
  margin-bottom: 0.1rem;
`;
const FormBlockFlexChildren = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FormBlock: React.FC<{
  name: string;
  color: string;
  title?: string;
  group?: boolean;
}> = ({ name, color, title, group, children }) => {
  return (
    <AutoPrefix name={name}>
      <FormBlockTitle color={color}>{title}</FormBlockTitle>
      <FormBlockContainer color={color} group={Boolean(group)}>
        {group ? (
          children
        ) : (
          <FormBlockFlexChildren>{children}</FormBlockFlexChildren>
        )}
      </FormBlockContainer>
    </AutoPrefix>
  );
};

export default FormBlock;
