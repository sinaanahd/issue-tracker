import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import styles from './issueDetails.module.css'

interface Props {
  id: number
}

const EditIssueButton = ({ id }: Props) => {
  return (
    <Button>
      <Link href={`/issues/${id}/edit`} className={styles.editBtn}>
        Edit Issue <FiEdit />
      </Link>
    </Button>
  )
}

export default EditIssueButton
