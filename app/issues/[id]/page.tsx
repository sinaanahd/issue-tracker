import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import styles from './issueDetails.module.css'

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
      <h1 className={styles.title}>{issue.title}</h1>
      <div className={styles.textStatusWrapper}>
        <IssueStatusBadge status={issue.status} />
        <p className={styles.dateWrapper}>{issue.createdAT.toDateString()}</p>
      </div>
      <p>{issue.description}</p>
    </div>
  )
}

export default IssueDetailsPage
