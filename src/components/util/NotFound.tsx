import React from 'react'
import { Box } from '@material-ui/core'
import Warning from './Warning'
import { paths } from '../../routes'

const NotFound: React.FC<{ location: { pathname: string } }> = ({
  location: { pathname },
}) => (
  <Warning
    title='Nothing found'
    actions={[{ text: 'Back to start page', targetUrl: paths.home() }]}
  >
    No route matching{' '}
    <Box fontWeight='fontWeightBold' display='inline'>
      {pathname}
    </Box>{' '}
    could be found.
  </Warning>
)

export default NotFound
