import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import styles from './issueDetails.module.css'
import DeleteIssueButton from './DeleteIssueButton'
interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) {
    notFound()
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.issueOldDatas}>
        <IssueDetails issue={issue} />
      </div>
      <div className={styles.secondCol}>
        <EditIssueButton id={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default IssueDetailsPage
