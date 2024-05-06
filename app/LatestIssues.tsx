import React from 'react'
import prisma from '@/prisma/client'
import { Table, Flex, Button, Card, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAT: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  })
  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Button variant="soft">{issue.assignedToUser.name}</Button>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
