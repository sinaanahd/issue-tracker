'use client'
import React, { useState } from 'react'
import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import delay from 'delay'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = async () => {
  const [error, set_error] = useState('')
  const [is_submitting, set_is_submitting] = useState(false)
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
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
  await delay(200)
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
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
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

export default NewIssuePage
