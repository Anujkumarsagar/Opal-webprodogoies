import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'

const WorkspaceForm = () => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace()
  return (
    <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>

      <FormGenerator<{ name: string }>
        name={'name'}
        placeholder="Workspace Name"
        label='Name'
        errors={errors}
        inputType='input'
        type='text'
        register={register}
      />
      <Button
        className='text-sm w-full mt-2'
        type='submit'
        disabled={isPending}
      >

        <Loader state={isPending}>Create Workspace</Loader>


      </Button>

    </form>
  )
}

export default WorkspaceForm