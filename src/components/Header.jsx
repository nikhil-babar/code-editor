import { Box, Tabs, Tab, IconButton } from '@mui/material'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeFile, openFile, selectCurrentFileId, selectFile, selectOpenFileIds } from '../features/Editor/editorSlice';
import { Close } from '@mui/icons-material';

const File = ({ fileId }) => {
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
                icon={<IconButton sx={{ color: 'white', marginTop: '3px' }} onClick={handleCloseFile} ><Close sx={{ fontSize: '1rem' }} /></IconButton>}
                sx={{
                    paddingX: 1,
                    display: 'flex',
                    minHeight: 'auto',
                    height: '50px',
                    border: '1px solid gray',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    textTransform: 'none'
                }}
                onClick={() => handleOpenFile(fileId)}
            />
        </>
    )
}

const Header = ({ sx }) => {
    const openFileIds = useSelector(state => selectOpenFileIds(state.editor))
    const fileId = useSelector(state => selectCurrentFileId(state.editor))

    const index = openFileIds.indexOf(fileId)

    return (
        <>
            <Box
                sx={{
                    ...sx,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#25252B',
                    border: '2px solid gray',
                }}
            >
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={index}
                    sx={{
                        color: 'white',
                        flexGrow: 1,
                        height: '10px'
                    }}
                >
                    {
                        openFileIds.map((e) => <File key={e} fileId={e} />)
                    }
                </Tabs>
            </Box >
        </>
    )
}

export default Header
