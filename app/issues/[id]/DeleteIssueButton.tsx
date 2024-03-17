'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { FaRegTrashAlt } from 'react-icons/fa'

const DeleteIssueButton = ({ issueId }: { issueId: Number }) => {
  return (
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
            <Button color="red">Delete issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
