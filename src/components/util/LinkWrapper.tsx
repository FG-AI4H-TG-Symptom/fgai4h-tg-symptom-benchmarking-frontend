import React from 'react'
import { Link } from 'react-router-dom'

const LinkWrapper: React.FC<{ to: string }> = ({ to, children }) => (
  <Link className='link-wrapper' to={to}>
    {children}
  </Link>
)

export default LinkWrapper
