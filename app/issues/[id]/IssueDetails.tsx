import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import styles from './issueDetails.module.css'

interface Props {
  issue: Issue
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <h1 className={styles.title}>{issue.title}</h1>
      <div className={styles.textStatusWrapper}>
        <IssueStatusBadge status={issue.status} />
        <p className={styles.dateWrapper}>{issue.createdAT.toDateString()}</p>
      </div>
      <ReactMarkdown className={styles.mainTexts}>
        {issue.description}
      </ReactMarkdown>
    </>
  )
}

export default IssueDetails
