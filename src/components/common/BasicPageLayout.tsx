import React, { ReactNode } from 'react'
import { Box, Typography } from '@material-ui/core'

const BasicPageLayout: React.FC<{
  title: ReactNode
  action?: JSX.Element
}> = ({ title, action, children }) => (
  <>
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      marginBottom={2}
    >
      <Typography variant='h2'>{title}</Typography>
      {action}
    </Box>
    {children}
  </>
)

export default BasicPageLayout
