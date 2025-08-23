import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type intialStateProps = {
    folders:({
        _count: {
            videos: number
        }
    } & {
        id: string
        name: string
        workspaceId: string
        createdAt: Date
    })[]
}

const initialState: intialStateProps = {
    folders: []
}

export const Folders = createSlice({
    name: 'folders',
    initialState,
    reducers:{
        FOLDERS: (state, action: PayloadAction<intialStateProps>) => {
            return {...action.payload}
        }
    }
})

export const { FOLDERS } = Folders.actions
export default Folders.reducer