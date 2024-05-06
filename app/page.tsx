import { Flex } from '@radix-ui/themes'
import Pagination from './components/Pagination'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import prisma from '@/prisma/client'

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  })
  const closed = await prisma.issue.count({
    where: { status: 'ClOSED' },
  })
  return (
    <Flex gap="5" direction="column">
      <LatestIssues />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </Flex>
  )
}
