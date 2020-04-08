import React from 'react'
import { Button } from '@material-ui/core'

import FormBlock from './FormBlock'
import { useAutoFieldArray } from './utils'
import { usePrefix } from './PrefixContext'

interface AutoArrayFormBlockProps {
  title: string
  name: string
  color: string
  formComponent: React.FC<{}>
}

const AutoArrayFormBlock: React.FC<AutoArrayFormBlockProps> = ({
  title,
  name,
  color,
  formComponent: FormComponent,
}) => {
  const fieldArray = useAutoFieldArray({
    name: usePrefix() + name,
  })

  return (
    <FormBlock group name={name} color={color} title={title}>
      {fieldArray.fields.map(({ key }, index) => (
        <FormBlock key={key} name={`[${index}]`} color={color}>
          <FormComponent />
        </FormBlock>
      ))}
      <Button onClick={(): void => fieldArray.append({})}>
        Add {title.replace(/s$/, '')}
      </Button>
    </FormBlock>
  )
}

export default AutoArrayFormBlock
