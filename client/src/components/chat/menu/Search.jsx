import { Box } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import styled from '@emotion/styled';

const Component = styled(Box)`
background:#fff;
height:45px;
border-bottom:0.1px solid #ededed;
display:flex;
align-items:center;
`;

const Wrapper = styled(Box)`
    background-color:#f0f2f5;
    position:relative;
    margin:0 13px;
    width:100%;
    border-radius:10px;
`
const Icon = styled(Box)`
    position:absolute;
    height:100px;
    padding:6px 10px;
    color:#919191;
`
const Inputfield = styled(InputBase)`
    width:100%;
    padding:16px;
    height:15px;
    padding-left:65px;
    font-size:14px;

`

const Search = ({setText}) => {
  return (
    <Component>
        <Wrapper>
            <Icon>
                <SearchIcon fontSize='small'/>
                </Icon>

                <Inputfield placeholder='Search or Start New Chat' onChange={(e)=>{setText(e.target.value)}}/>
            
        </Wrapper>
    </Component>
  )
}

export default Search
