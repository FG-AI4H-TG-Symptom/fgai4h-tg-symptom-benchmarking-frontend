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
} from '@material-ui/core'
import { Launch as LaunchIcon } from '@material-ui/icons'

import { AiImplementationInfo } from '../../../data/aiImplementationList/aiImplementationDataType'
import AiImplementationHealthComponent from './AiImplementationHealthComponent'

interface AiImplementationManagerComponentProps {
  aiImplementations: {
    [name: string]: AiImplementationInfo
  }
}

const AiImplementationManagerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  aiImplementations,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>
          {Object.keys(aiImplementations).length} AI implementations
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Health</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(aiImplementations).map(({ name, health }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>
                <AiImplementationHealthComponent health={health} />
              </TableCell>
              <TableCell>
                <IconButton aria-label='view' disabled>
                  <LaunchIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default AiImplementationManagerComponent
