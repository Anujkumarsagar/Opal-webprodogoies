"use client"

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Loader from '../loader'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { renameFolders } from '@/app/actions/workspace'
import { Input } from '@/components/ui/input'
import { late } from 'zod/v3'

type Props = {
  name: string
  id: string
  optimstic?: boolean
  count?: number
}

const Folder = ({ id, name, count, optimstic }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const folderCardRef = useRef<HTMLDivElement | null>(null)
  const pathName = usePathname()
  const router = useRouter()
  const [onRename, setOnRename] = useState(false)

  const { mutate, isPending } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(id, data.name),
    'workspace-folders',
    () => setOnRename(false)
  )


  const handleFolderClick = () => {
    router.push(`${pathName}/folder/${id}`)
  }

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation()
    setOnRename(true)
  }

  const [localName, setLocalName] = useState(name);

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    const newName = inputRef.current.value.trim();
    if (newName) {
      setLocalName(newName); // optimistic update
      mutate({ name: newName });
    } else {
      setOnRename(false);
    }
  };


  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimstic && 'opacity-60',
        'flex hover:bg-neutral-800 transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]'
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
              autoFocus
              onBlur={updateFolderName}
            />
          ) : (
            <p
              onDoubleClick={handleNameDoubleClick}
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
            >
              {localName}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
    </div>
  )
}

export default Folder
