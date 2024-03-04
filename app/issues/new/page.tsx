'use client';
import React from 'react'
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import {useForm , Controller} from "react-hook-form";
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

interface IssueForm{
    title : string,
    description : string
}
const NewIssuePage = () => {
    const router = useRouter();
    const {register , control , handleSubmit} = useForm<IssueForm>();
    const send_post_data = async (data : object) => {
        await axios.post('/api/issues' , data);
        router.push("/issues")
    }
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data)=> {
        send_post_data(data)
    })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register("title")}/>
      </TextField.Root>
      <Controller 
      name='description'
      control={control} 
      render={({field})=> <SimpleMDE placeholder='Description' {...field}/>} />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
