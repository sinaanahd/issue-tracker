'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
  const [users, set_users] = useState<User[]>([])
  const fetchUsers = async () => {
    const { data } = await axios.get<User[]>('/api/users')
    set_users(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user) => (
              <Select.Item value={user.id + ''} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
