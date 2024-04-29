'use client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Sina Anahid</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
