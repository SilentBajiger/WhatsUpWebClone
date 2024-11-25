import { Box } from '@mui/material';
import React, { useState } from 'react'
import Header from './Header';
import Search from './Search';
import Conversations from './Conversations';


// components
const Menu = () => {
  const[text,setText] = useState('');
  return (
    <Box>
      <Header/>
      <Search setText={setText}/>
      <Conversations text={text}/>
    </Box>
  )
};

export default Menu;
