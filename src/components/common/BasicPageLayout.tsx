import React, { ReactNode } from 'react'
import { Box, Typography } from '@material-ui/core'
import PageWrapper from './PageWrapper'

const BasicPageLayout: React.FC<{
  title: ReactNode
  action?: JSX.Element
  unlimitedWidth?: boolean
}> = ({ title, action, children, unlimitedWidth }) => {
  let content = (
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
  if (!unlimitedWidth) {
    content = <PageWrapper>{content}</PageWrapper>
  }

  return <>{content}</>
}

export default BasicPageLayout
