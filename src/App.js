import React from 'react'
import { Grid } from '@mui/material'
import FileSystem from './components/FileSystem'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'

const App = () => {
  return (
    <>
      <Grid
        container={true}
        sx={{
          height: '100%',
          margin: '0px',
          boxSizing: 'border-box',
          overflowY: 'hidden'
        }}
      >
        <Grid item xs={1.5}>
          <FileSystem />
        </Grid>
        <Grid item xs={10.5} height={'100%'}>
          <Header />
          <Editor />
        </Grid>
      </Grid>
    </>
  )
}

export default App
