import React from 'react'
import { useFormContext } from 'react-hook-form'
import { usePrefix } from './PrefixContext'

interface AutoReadOnlyFieldProps {
  name: string
}

const AutoReadOnlyField: React.FC<AutoReadOnlyFieldProps> = ({ name }) => {
  const { register } = useFormContext()
  const prefixedName = usePrefix() + name
  return <input type='hidden' name={`${prefixedName}`} ref={register} />
}

export default AutoReadOnlyField
