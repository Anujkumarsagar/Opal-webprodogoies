import CreateFolder from '@/components/global/create-folder'
import CreateWorkspace from '@/components/global/create-workspace'
import Folders from '@/components/global/folders'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

type Props = {
    params: { workspaceId: string }
}

const Page = ({ params }: Props) => {
    return (
        <div>
            <Tabs className='mt-6'
                defaultValue='videos'>
                <div className=' flex w-full justify-between items-center '>
                    <TabsList className='bg-transparent gap-2 pl-0'>

                        <TabsTrigger value="videos" className='px-6 rounded-full data-[state=active]:bg-[#252525]'>
                            Videos
                        </TabsTrigger>
                        <TabsTrigger value="archive" className='px-6 rounded-full data-[state=active]:bg-[#252525]'  >Archive</TabsTrigger>
                    </TabsList>
                    <div className='flex gap-x-3'>
                        <CreateWorkspace  />
                        <CreateFolder workspaceId={params.workspaceId} />
                    </div>
                </div>
                <section className='py-9'>
                    <TabsContent value='videos'>
                        <Folders workspaceId={params.workspaceId} />
                    </TabsContent>
                </section>
            </Tabs>
        </div>
    )
}

export default Page