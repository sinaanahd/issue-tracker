'use client'
import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const DeleteIssueButton = ({ issueId }: { issueId: Number }) => {
  const [is_submitting, set_is_submitting] = useState(false)
  const [error, set_error] = useState(false)
  const router = useRouter()
  const handle_delete_issue = async () => {
    try {
      set_is_submitting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      set_is_submitting(false)
      set_error(true)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            Delete Issue
            <FaRegTrashAlt />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue this action is undone!
          </AlertDialog.Description>
          <Flex className="mt-4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={() => {
                  handle_delete_issue()
                }}
              >
                Delete issue {is_submitting && <Spinner />}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error happend</AlertDialog.Title>
          <AlertDialog.Description>
            This issue can not be done because of an unexpected error
          </AlertDialog.Description>
          <Button
            style={{ marginTop: '1rem' }}
            color="gray"
            variant="soft"
            onClick={() => {
              set_error(false)
            }}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
