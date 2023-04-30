import { Grid, IconButton } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { executeCode, selectCurrentFileId, selectFile, updateFile } from '../features/Editor/editorSlice'
import MonacoEditor from '@monaco-editor/react'
import { PlayArrow } from '@mui/icons-material'

const Editor = () => {
    const currentFileId = useSelector(state => selectCurrentFileId(state.editor))
    const editor = useSelector((state => selectFile(state.editor, currentFileId)))
    const editorRef = useRef()
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleSubmit = useCallback(() => {

        dispatch(executeCode({
            code: editorRef.current?.getValue(),
            input: inputRef.current?.getValue(),
            fileId: currentFileId
        }))

    }, [dispatch, currentFileId])

    useEffect(() => {
        if (!currentFileId) return

        const id = currentFileId

        return () => {
            if (!id) return

            dispatch(updateFile({
                fileId: id,
                code: editorRef.current?.getValue(),
                input: inputRef.current?.getValue()
            }))

            editorRef.current?.setValue('')
            inputRef.current?.setValue('')
        }
    }, [currentFileId, dispatch])

    return (
        <>
            <Grid container height={'100%'}>
                <Grid item xs={8} >
                    <MonacoEditor
                        language={editor?.lang}
                        theme='vs-dark'
                        width={'100%'}
                        height={'100%'}
                        value={editor?.code}
                        onMount={e => editorRef.current = e}
                    />
                </Grid>

                <Grid item xs={4}>
                    <MonacoEditor
                        language='plaintext'
                        theme='vs-dark'
                        width={'100%'}
                        height={'50%'}
                        value={editor?.input}
                        onMount={e => inputRef.current = e}
                    />

                    <MonacoEditor
                        language='plaintext'
                        theme='vs-dark'
                        width={'100%'}
                        height={'50%'}
                        options={{
                            readOnly: true
                        }}
                        value={editor?.output}
                    />
                </Grid>
            </Grid >
            <IconButton sx={{ width: '100px', position: 'absolute', top: 1, right: 2 }} onClick={handleSubmit}>
                <PlayArrow color='success' fontSize='large'/>
            </IconButton>
        </>
    )
}

export default Editor



/*

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}

*/
