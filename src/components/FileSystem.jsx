import { AddOutlined, FileOpen } from "@mui/icons-material"
import { Box, IconButton, List, ListItem, Modal, Typography, TextField, Button, Icon } from "@mui/material"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFile, openFile, selectAllFiles } from "../features/Editor/editorSlice"

const File = ({ file }) => {
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        dispatch(openFile({
            fileId: file?.fileId
        }))
    }, [file?.fileId, dispatch])

    return (
        <>
            <ListItem
                sx={{
                    cursor: 'pointer'
                }}

                onClick={handleClick}
            >
                <Icon
                    fontSize="small"
                >
                    <FileOpen />
                </Icon>
                <Typography
                    sx={{
                        marginLeft: 1,
                        borderBottom: '1px solid white'
                    }}
                    variant="h7"
                >
                    {file?.nameWithExtension}
                </Typography>
            </ListItem>
        </>
    )
}


const FileSystem = ({ sx }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filename, setFilename] = useState('')
    const dispatch = useDispatch()

    const files = useSelector(state => selectAllFiles(state.editor))

    const handleSubmit = useCallback(() => {
        if (!filename || filename.length === 0) return

        const [name, extension] = filename.split('.')

        dispatch(addFile({
            name,
            extension
        }))

        setIsModalOpen(false)

    }, [filename, dispatch])

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#25252F',
                    color: 'white',
                    height: '100%',
                    border: '2px solid gray',
                    ...sx
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px'
                    }}
                >
                    <Typography variant="h6">Explorer</Typography>
                    <IconButton sx={{
                        color: 'green',
                    }}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <AddOutlined />
                    </IconButton>
                </Box>
                <List>
                    {
                        files?.map(e => <File key={e.fileId} file={e}/>)
                    }
                </List>
            </Box >
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        backgroundColor: '#001E3C',
                        padding: 2,
                        borderRadius: '4%',
                        width: 'fit-content',
                        transform: 'translate(-50%, -50%)',
                        color: 'white'
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>New File</Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ marginX: 1, input: { color: 'white' } }} onChange={(e) => setFilename(e.target.value)} />
                    <Button type="submit" sx={{ backgroundColor: 'green', color: 'white' }} onClick={handleSubmit}>create</Button>
                </Box>
            </Modal >
        </>
    )
}

//#0F1016

export default FileSystem
