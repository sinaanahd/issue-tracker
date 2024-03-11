import React from 'react'
import { Button, Link } from '@radix-ui/themes'
import styles from './IssueActions.module.css'

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new" className={styles.issueBtn}>
          New Issue
        </Link>
      </Button>
    </div>
  )
}

export default IssueActions
