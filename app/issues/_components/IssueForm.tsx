'use client'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { createIssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueFormData = z.infer<typeof createIssueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = async ({ issue }: Props) => {
  const [error, set_error] = useState('')
  const [is_submitting, set_is_submitting] = useState(false)
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  })
  const send_post_data = async (data: object) => {
    try {
      set_is_submitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      set_is_submitting(false)
      set_error('An unexpected error occured.')
    }
  }
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root>
          <Callout.Text color="red" className="mb-5">
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit((data) => {
          send_post_data(data)
        })}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={is_submitting}>
          Submit New Issue {is_submitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
