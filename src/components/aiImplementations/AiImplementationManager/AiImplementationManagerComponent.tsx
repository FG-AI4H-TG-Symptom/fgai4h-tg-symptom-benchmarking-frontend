import React from 'react'
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
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  ViewList as ViewEditIcon,
} from '@material-ui/icons'

import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import ConfirmationIconButton from '../../common/ConfirmationIconButton'

import AiImplementationHealthComponent from './AiImplementationHealthComponent'

interface AiImplementationManagerComponentProps {
  aiImplementations: AiImplementationInfo[]
  deleteAiImplementation: (aiImplementationId: string) => void
}

const AiImplementationManagerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  aiImplementations,
  deleteAiImplementation,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>{aiImplementations.length} AI implementations</caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Health</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aiImplementations.map(({ id, name, health }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>
                <AiImplementationHealthComponent health={health} />
              </TableCell>
              <TableCell>
                <Tooltip title='View / edit'>
                  <span>
                    <IconButton aria-label='view' disabled>
                      <ViewEditIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <ConfirmationIconButton
                  onConfirmed={(): void => deleteAiImplementation(id)}
                  color='darkred'
                  label='Hold to delete'
                >
                  <DeleteIcon />
                </ConfirmationIconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default AiImplementationManagerComponent
