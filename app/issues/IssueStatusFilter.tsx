'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: { label: string; value?: Status }[] = [
  {
    label: 'All',
  },
  {
    label: 'open',
    value: 'OPEN',
  },
  {
    label: 'in progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'closed',
    value: 'ClOSED',
  },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  return (
    <div>
      <Select.Root
        onValueChange={(status) => {
          const query = status !== ' ' ? `?status=${status}` : ''
          router.push('/issues/' + query)
        }}
      >
        <Select.Trigger placeholder="Filter by status ..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item value={status.value || ' '} key={status.label}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default IssueStatusFilter
