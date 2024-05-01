'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()
  if (error) return null

  //! old way
  //   const [users, set_users] = useState<User[]>([])
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>('/api/users')
  //     set_users(data)
  //   }
  //   useEffect(() => {
  //     fetchUsers()
  //   }, [])

  const assign_user = (userId: string) => {
    const numerical_id = parseInt(userId)

    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: numerical_id ? numerical_id : null,
      })
      .catch(() => {
        toast.error('Changes could not be saved')
      })
  }
  return (
    <>
      <Select.Root
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId + '' : 0 + ''
        }
        onValueChange={assign_user}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={0 + ''}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id + ''} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  )
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 10 * 60 * 1000, // 10 min
    retry: 3,
  })

export default AssigneeSelect
