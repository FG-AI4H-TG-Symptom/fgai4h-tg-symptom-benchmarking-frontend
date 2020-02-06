import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import LinkWrapper from './LinkWrapper'
import TextPageWrapper from './TextPageWrapper'

const NotFound: React.FC<{ location: { pathname: string } }> = ({
  location: { pathname },
}) => (
  <TextPageWrapper>
    <Typography variant='h1' gutterBottom>
      Nothing found
    </Typography>
    <Typography>
      No route matching{' '}
      <Box fontWeight='fontWeightBold' display='inline'>
        {pathname}
      </Box>{' '}
      could be found.
    </Typography>
    <Box display='flex' justifyContent='flex-end' marginTop={2}>
      <LinkWrapper to='/'>
        <Button variant='contained'>Back to start page</Button>
      </LinkWrapper>
    </Box>
  </TextPageWrapper>
)

export default NotFound
