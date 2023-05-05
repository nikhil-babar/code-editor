import { Box, Tabs, Tab, IconButton } from '@mui/material'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeFile, openFile, selectCurrentFileId, selectFile, selectOpenFileIds } from '../features/Editor/editorSlice';
import { Close } from '@mui/icons-material';

const File = ({ fileId, currentFileId }) => {
    const file = useSelector(state => selectFile(state.editor, fileId))
    const openFileIds = useSelector(state => selectOpenFileIds(state.editor))
    const dispatch = useDispatch()

    const handleCloseFile = useCallback((e) => {
        e.stopPropagation()

        dispatch(closeFile({
            fileId
        }))

    }, [dispatch, fileId])

    const handleOpenFile = useCallback((fileId) => {

        dispatch(openFile({
            fileId
        }))

    }, [dispatch])


    const index = openFileIds.indexOf(fileId)

    return (
        <>
            <Tab
                key={fileId}
                label={file?.nameWithExtension}
                value={index}
                icon={<IconButton sx={{ color: 'white', marginTop: '3px', position: 'relative', left: 10 }} onClick={handleCloseFile} ><Close sx={{ fontSize: '0.8rem' }} /></IconButton>}
                sx={{
                    display: 'flex',
                    minHeight: 'auto',
                    height: '40px',
                    border: '1px solid gray',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    textTransform: 'none',
                    background: (currentFileId === fileId) ? '#282c34' : '#21252b'
                }}
                onClick={() => handleOpenFile(fileId)}
            />
        </>
    )
}

const Header = () => {
    const openFileIds = useSelector(state => selectOpenFileIds(state.editor))
    const currentFileId = useSelector(state => selectCurrentFileId(state.editor))
    const fileId = useSelector(state => selectCurrentFileId(state.editor))

    const index = openFileIds.indexOf(fileId)

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#21252b',
                    height: '40px'
                }}
            >
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={index}
                    sx={{
                        color: 'white',
                        flexGrow: 1,
                        height: '0px',
                        position: 'relative'
                    }}
                >
                    {
                        openFileIds.map((e) => <File key={e} fileId={e} currentFileId={currentFileId} />)
                    }
                </Tabs>
            </Box >
        </>
    )
}

export default Header
