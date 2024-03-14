import React from 'react'
import styles from './issueDetails.module.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Skeleton width={'200px'} />
      <div className={styles.textStatusWrapper}>
        <Skeleton width={'5rem'} />
        <Skeleton width="8rem" />
      </div>
      <Skeleton width={'100%'} height={'10vh'} />
    </div>
  )
}

export default LoadingIssueDetailPage
