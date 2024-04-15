import React from 'react';
import './App.css'
import Carlist from './Components/Carlist'
import {AppBar, Typography} from '@mui/material'


function App() {

  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6">
          CarList
        </Typography>
    </AppBar>
      <Carlist />
    </div>
  );
}

export default App
