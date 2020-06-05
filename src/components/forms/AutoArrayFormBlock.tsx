import React from 'react'
import { Button } from '@material-ui/core'

import { BaseNamedConcept } from '../../data/util/baseConceptTypes'

import FormBlock from './FormBlock'
import { useAutoFieldArray, useWatchArrayHelper } from './utils'

export type ArrayFormComponentProps = {
  possibleValues: Array<BaseNamedConcept>
  onRemove: () => void
}

export type AutoArrayFormBlockProps = {
  title: string
  name: string
  color: string
  formComponent: React.FC<{
    possibleValues: BaseNamedConcept[]
    onRemove: () => void
  }>
  possibleValues: Array<BaseNamedConcept>
}

const AutoArrayFormBlock: React.FC<AutoArrayFormBlockProps> = ({
  title,
  name,
  color,
  formComponent: FormComponent,
  possibleValues,
}) => {
  const fieldArray = useAutoFieldArray({
    name,
  })

  const currentValueIds = useWatchArrayHelper(fieldArray, `${name}[*].id`)

  return (
    <FormBlock group name={name} color={color} title={title}>
      {fieldArray.fields.map(({ key }, index) => (
        <FormBlock key={key} name={`[${index}]`} color={color}>
          <FormComponent
            possibleValues={possibleValues.filter(
              ({ id }) =>
                id === currentValueIds[index] || !currentValueIds.includes(id),
            )}
            onRemove={(): void => fieldArray.remove(index)}
          />
        </FormBlock>
      ))}
      {fieldArray.fields.length < possibleValues.length ? (
        <Button onClick={(): void => fieldArray.append({})}>
          Add {title.replace(/s$/, '')}
        </Button>
      ) : null}
    </FormBlock>
  )
}

export default AutoArrayFormBlock
