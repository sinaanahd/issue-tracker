'use client'
import React, { useState } from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'

interface IssueForm {
  title: string
  description: string
}
const NewIssuePage = () => {
  const [error, set_error] = useState('')
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const send_post_data = async (data: object) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
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
        onSubmit={handleSubmit((data) => {
          send_post_data(data)
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
