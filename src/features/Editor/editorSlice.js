import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../axiosClient";
import { v4 as uuid } from "uuid";

const FILE_STATUS = {
    pending: 'PENDING',
    failure: 'FAILURE',
    success: 'SUCCESS',
    idle: 'IDLE'
}

const EXTENSION_TO_LANG = {
    'js': 'javascript',
    'java': 'java',
    'py': 'python',
    'cpp': 'cpp',
    'c': 'c'
}

const getOutput = createAsyncThunk('editor/get-output', async ({ fetchRetry = 0, _id, fileId }, { dispatch }) => {
    try {
        const res = await axiosClient.get('/code-execution', {
            params: {
                id: _id
            }
        })

        if (res.data.status === 'failed') throw new Error(res.data.error?.stack)

        return { ...res.data, fileId }

    } catch (error) {
        if (error.response && error.response.status === 404 && fetchRetry <= 5) {
            setTimeout(() => dispatch(getOutput({ fetchRetry: ++fetchRetry, _id, fileId })), 1000)

            return Promise.reject(JSON.stringify({ fileId, message: 'pending' }))
        } else {
            return Promise.reject(JSON.stringify({ fileId, message: error.message }))
        }
    }
})

export const executeCode = createAsyncThunk('editor/execute-code', async ({ code, input, fileId }, { getState, dispatch }) => {
    try {

        dispatch(updateFile({
            code,
            input,
            fileId
        }))

        const res = await axiosClient.post('/code-execution', {
            code,
            lang: fileAdapter.getSelectors().selectById(getState().editor, fileId)?.lang,
            input
        })

        dispatch(getOutput({
            _id: res.data._id,
            fileId
        }))

    } catch (error) {
        return Promise.reject(error.message)
    }
})

const fileAdapter = createEntityAdapter({
    selectId: (state) => state.fileId,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const EditorSlice = createSlice({
    name: 'editor',
    initialState: {
        ...fileAdapter.getInitialState(),
        openFileIds: [],
        currentFileId: null
    },
    reducers: {
        addFile: (state, action) => {
            const newFile = {
                ...action.payload,
                fileId: uuid(),
                status: FILE_STATUS.idle,
                code: '',
                input: '',
                output: '',
                lang: EXTENSION_TO_LANG[action.payload.extension],
                nameWithExtension: [action.payload.name, action.payload.extension].join('.')
            }

            fileAdapter.addOne(state, newFile)
            state.openFileIds.push(newFile.fileId)
            state.currentFileId = newFile.fileId
        },

        openFile: (state, action) => {
            const { fileId } = action.payload
            if (!fileId) return

            const index = state.openFileIds.findIndex(e => e === fileId)

            if (index === -1) {
                state.openFileIds.push(fileId)
            }

            state.currentFileId = fileId
        },

        closeFile: (state, action) => {
            const { fileId } = action.payload
            const index = state.openFileIds.findIndex(e => e === fileId)

            if (index === -1) return

            state.openFileIds.splice(index, 1)
            state.currentFileId = (state.openFileIds.length !== 0) ? state.openFileIds[Math.min(index, state.openFileIds.length - 1)] : null
        },

        updateFile: (state, action) => {
            fileAdapter.updateOne(state, { id: action.payload.fileId, changes: { ...action.payload } })
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getOutput.rejected, (state, action) => {
                const { fileId, message } = JSON.parse(action.error.message)

                if (message === 'pending') {
                    fileAdapter.updateOne(state, { id: fileId, changes: { status: 'pending' } })
                } else {
                    fileAdapter.updateOne(state, { id: fileId, changes: { status: 'failed' } })
                }
            })
            .addCase(getOutput.fulfilled, (state, action) => {
                const { fileId, output } = action.payload

                fileAdapter.updateOne(state, { id: fileId, changes: { output: output?.stdout, status: 'success' } })
            })
    }
})

export const { addFile, openFile, closeFile, updateFile } = EditorSlice.actions

export const {
    selectAll: selectAllFiles,
    selectById: selectFile,
    selectIds: selectFileIds
} = fileAdapter.getSelectors()

export const selectOpenFileIds = createSelector(
    [state => state.openFileIds],
    state => state
)

export const selectCurrentFileId = createSelector(
    [state => state.currentFileId],
    state => state
)

export default EditorSlice.reducer

