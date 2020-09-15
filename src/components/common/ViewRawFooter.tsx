import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import ViewRaw from './ViewRaw';

const ViewRawFooter: React.FC<{ data: any; ariaPrefix: string }> = ({ data, ariaPrefix }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${ariaPrefix}-content`}
      id={`${ariaPrefix}-header`}
    >
      View Raw Evalution Response
    </AccordionSummary>
    <AccordionDetails id={`${ariaPrefix}-content`}>
      <ViewRaw data={data} />
    </AccordionDetails>
  </Accordion>
);

export default ViewRawFooter;
