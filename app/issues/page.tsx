import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import IssueActions from './IssueActions'
import Link from 'next/link'
import { Issue, Status } from '@prisma/client'

interface Props {
  searchParams: {
    status: Status
    orderBy: keyof Issue
  }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'CreatedAt',
      value: 'createdAT',
      className: 'hidden md:table-cell',
    },
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined
  const orderBy = columns.map((c) => c.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  })
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy && '^'}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
            {/*
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
             <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-violet-600 hover:underline font-bold"
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAT.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage
