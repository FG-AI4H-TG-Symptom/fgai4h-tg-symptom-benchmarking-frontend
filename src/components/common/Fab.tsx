import React from "react";
import styled from "styled-components";
import { Fab as MuiFab, Tooltip } from "@material-ui/core";

export const PositionedFab = styled(MuiFab)`
  position: fixed;
  top: calc(100% - 7rem);
  right: 3rem;
  z-index: 10;
`;

interface FabProps {
  label: string;
  type: "submit" | "button";
}

const Fab: React.FC<FabProps> = ({ type, label, children }) => (
  <Tooltip title={label}>
    <PositionedFab color="primary" aria-label={label} type={type}>
      {children}
    </PositionedFab>
  </Tooltip>
);

export default Fab;
