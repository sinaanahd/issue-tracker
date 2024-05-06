'use client'
import { Card } from '@radix-ui/themes'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Label,
} from 'recharts'
import React from 'react'
interface Props {
  open: number
  inProgress: number
  closed: number
}
const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { Label: 'Open', value: open },
    { Label: 'In progress', value: inProgress },
    { Label: 'Closed', value: closed },
  ]
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} fill="#6e56cf" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
