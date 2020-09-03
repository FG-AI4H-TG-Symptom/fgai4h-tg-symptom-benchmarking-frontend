import React from "react";
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
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  ViewList as ViewEditIcon,
} from "@material-ui/icons";

import ConfirmationIconButton from "../../common/ConfirmationIconButton";

import AiImplementationHealthComponent from "./AiImplementationHealthComponent";

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
              <TableCell>Health</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aiImplementations.map(({ id, name, createdOn }) => {
              const health = aisHealth ? aisHealth[id] : null;

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
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <AiImplementationHealthComponent health={health} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View / edit">
                      <span>
                        <IconButton aria-label="view" disabled>
                          <ViewEditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
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
