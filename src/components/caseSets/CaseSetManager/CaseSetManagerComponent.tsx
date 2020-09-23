import React from 'react';
import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ViewList as ViewEditIcon,
  PlayCircleOutline as StartBenchmarkIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import LinkWrapper from '../../common/LinkWrapper';
import { paths } from '../../../routes';

import * as Styled from './CaseSetManagerComponent.style';
import * as CommonStyled from '../../common/CommonStyles';
import ConfirmationIconButton from '../../common/ConfirmationIconButton';
import formatDate from '../../../util/formatDate';

const LONDON_CASE_SET_ID = 'london_model2019_cases_v1';

const CaseSetManagerComponent: React.FC<any> = ({ datasetsList, deleteCaseSet }) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>{datasetsList.length} case sets</caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Labels</TableCell>
            <Styled.ActionHeaderTableCell>Actions</Styled.ActionHeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasetsList.map(({ id, name, cases, createdOn }) => {
            const date = new Date(createdOn);

            return (
              <TableRow key={id}>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="caption" color="secondary">
                      {id}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>{cases.length}</TableCell>
                <TableCell>
                  {id === LONDON_CASE_SET_ID ? <Chip label="Cases from doctors" color="primary" /> : null}
                </TableCell>
                <CommonStyled.ButtonsTableCell>
                  <LinkWrapper to={paths.caseSetViewer(id)}>
                    <Tooltip title="View / edit">
                      <IconButton aria-label="view">
                        <ViewEditIcon />
                      </IconButton>
                    </Tooltip>
                  </LinkWrapper>
                  <LinkWrapper to={paths.benchmarkCreate(id)}>
                    <Tooltip title="Run benchmark with this case set">
                      <IconButton aria-label="run-benchmark">
                        <StartBenchmarkIcon />
                      </IconButton>
                    </Tooltip>
                  </LinkWrapper>

                  <ConfirmationIconButton
                    onConfirmed={(): void => deleteCaseSet(id)}
                    color="darkred"
                    label="Hold to delete"
                  >
                    <DeleteIcon />
                  </ConfirmationIconButton>
                </CommonStyled.ButtonsTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default CaseSetManagerComponent;
