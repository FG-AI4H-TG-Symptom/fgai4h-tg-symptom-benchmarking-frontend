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

import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'

interface AiImplementationManagerComponentProps {
  aiImplementationList: AiImplementationInfo[]
}

const AiImplementationManagerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  aiImplementationList,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>{aiImplementationList.length} AI implementations</caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aiImplementationList.map(({ name }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
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
