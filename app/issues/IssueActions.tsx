import React from 'react'
import { Button, Flex, Link } from '@radix-ui/themes'
import styles from './IssueActions.module.css'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new" className={styles.issueBtn}>
          New Issue
        </Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
