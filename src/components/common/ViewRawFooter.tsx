import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import ViewRaw from "./ViewRaw";

const ViewRawFooter: React.FC<{ data: any; ariaPrefix: string }> = ({
  data,
  ariaPrefix
}) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${ariaPrefix}-content`}
      id={`${ariaPrefix}-header`}
    >
      View Raw Evalution Response
    </ExpansionPanelSummary>
    <ExpansionPanelDetails id={`${ariaPrefix}-content`}>
      <ViewRaw data={data} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default ViewRawFooter;
