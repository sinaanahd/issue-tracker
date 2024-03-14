import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import styles from './issueDetails.module.css'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'
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
  // await delay(2000)
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>{issue.title}</h1>
      <div className={styles.textStatusWrapper}>
        <IssueStatusBadge status={issue.status} />
        <p className={styles.dateWrapper}>{issue.createdAT.toDateString()}</p>
      </div>
      <ReactMarkdown className={styles.mainTexts}>
        {issue.description}
      </ReactMarkdown>
    </div>
  )
}

export default IssueDetailsPage
