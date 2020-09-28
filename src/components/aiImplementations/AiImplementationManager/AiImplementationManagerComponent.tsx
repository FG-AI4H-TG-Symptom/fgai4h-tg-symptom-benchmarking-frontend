import React from 'react';
import {
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
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import ConfirmationIconButton from '../../common/ConfirmationIconButton';

import AiImplementationHealthComponent from './AiImplementationHealthComponent';
import { paths } from '../../../routes';
import LinkWrapper from '../../common/LinkWrapper';
import formatDate from '../../../util/formatDate';

interface AiImplementationManagerComponentProps {
  aiImplementations: any[];
  aisHealth: any[];
  deleteAiImplementation: (aiImplementationId: string) => void;
}

const AiImplementationManagerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  aiImplementations,
  aisHealth,
  deleteAiImplementation,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <caption>{aiImplementations.length} AI implementations</caption>
          <TableHead>
            <TableRow>
              <TableCell>AI Implementation</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Modified On</TableCell>
              <TableCell>Health</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aiImplementations.map(({ id, name, createdOn, modifiedOn }) => {
              const health = aisHealth ? aisHealth[id] : null;

              const createdOnStr = formatDate(new Date(createdOn));
              const modifiedOnStr = formatDate(new Date(modifiedOn));
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
                  <TableCell>{createdOnStr}</TableCell>
                  <TableCell>{modifiedOnStr}</TableCell>
                  <TableCell>
                    <AiImplementationHealthComponent health={health} />
                  </TableCell>
                  <TableCell>
                    <LinkWrapper to={paths.aiImplementationEditor(id)}>
                      <Tooltip title="Edit">
                        <span>
                          <IconButton aria-label="view">
                            <EditIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </LinkWrapper>
                    <ConfirmationIconButton
                      onConfirmed={(): void => deleteAiImplementation(id)}
                      color="darkred"
                      label="Hold to delete"
                    >
                      <DeleteIcon />
                    </ConfirmationIconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AiImplementationManagerComponent;
