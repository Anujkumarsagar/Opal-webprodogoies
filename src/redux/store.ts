//store is a singleton, for to store all teh data
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import FolderReducer from "./slices/folders"
import WorkspaceReducer from "./slices/workspaces"
import { TypedUseSelectorHook, useSelector } from "react-redux"

const rootReducer = combineReducers({
    FolderReducer,
    WorkspaceReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware
        ({
            serializableCheck: false,
        }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector