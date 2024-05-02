import { Issue, Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusBadge from '../components/IssueStatusBadge'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface Props {
  searchParams: IssueQuery
  issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  )
}

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

export const columnNames = columns.map((c) => c.value)

export default IssueTable
