'use client';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuepage = () => {
    const { register, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const [error, setError] = useState("");
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color="red" className='mb-2'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form  className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {

                    await axios.post('/api/issues', data)
                    router.push('/issues');
                } catch (error) {
                    setError("Failed to create issue. Please try again.");
                }
            })}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <TextArea placeholder='Description' {...register('description')} />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuepage