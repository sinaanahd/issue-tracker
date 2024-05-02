'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  return (
    <div>
      <Select.Root
        defaultValue={searchParams.get('status') || ''}
        onValueChange={(status) => {
          const params = new URLSearchParams()
          if (status) params.append('status', status)
          if (searchParams.get('orderBy')) {
            params.append('orderBy', searchParams.get('orderBy')!)
          }
          const query = params.size ? '?' + params.toString() : ''
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
