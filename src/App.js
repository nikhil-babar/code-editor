import React from 'react'
import { Box } from '@mui/material'
import FileSystem from './components/FileSystem'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'

const App = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <FileSystem />
        <Box flexGrow={1}>
          <Header />
          <Editor />
        </Box>
      </Box>
    </>
  )
}

export default App
