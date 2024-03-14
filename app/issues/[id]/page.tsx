import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import styles from './issueDetails.module.css'
import ReactMarkdown from 'react-markdown'
import { FiEdit } from 'react-icons/fi'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
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
        <h1 className={styles.title}>{issue.title}</h1>
        <div className={styles.textStatusWrapper}>
          <IssueStatusBadge status={issue.status} />
          <p className={styles.dateWrapper}>{issue.createdAT.toDateString()}</p>
        </div>
        <ReactMarkdown className={styles.mainTexts}>
          {issue.description}
        </ReactMarkdown>
      </div>
      <div className="second-col">
        <Button>
          <Link href={`/issues/${issue.id}/edit`}>
            Edit Issue <FiEdit />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default IssueDetailsPage
