import styled from '@emotion/styled'
import MoreVert from '@mui/icons-material/MoreVert'
import Search from '@mui/icons-material/Search'
import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { defaultProfilePicture } from '../../../constants/data';
import { AccountContext } from '../../../Context/AccountProvider'


const Header = styled(Box)`
    height:44px;
    background:#ededed;
    padding:8px 16px;
    display:flex;
    align-items:center;
`;

const Image = styled('img')({
    height:40,
    width:40,
    borderRadius:'50%',
    objectFit:'cover',
});

const Name = styled(Typography)`
    margin-left:12px !important;
`


const Status = styled(Typography)`
    margin-left:12px !important;
    font-size:12px;
    color:rgb(0,0,0,0.6);
`
const RightContainer = styled(Box)`
    margin-left:auto;
    & > svg{
        padding:8px;
        font-size:24px;
        color:black;
    }
`


const ChatHeader = ({person}) => {

    const {activeUsers,socket} = useContext(AccountContext);
    const [typing,setTyping]=useState(false);
    socket.current.on("OnTyping",e=>{
        // console.log("yes");
        setTyping(true);
    })
    if(typing){
        setTimeout(() => {
            setTyping(false);
            // console.log("KITI")
        }, 2000);
    }
    

  return (
    <Header>
        <Image src={person.picture} alt="dp" />
        <Box>
            <Name>{person.name}</Name>
            {
                typing?<Status>{'typing...'}</Status>:
            <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'online' : 'offline'}</Status>

            }
            {/* <Status>{typing?'typing...':'not'}</Status> */}

        </Box>
        <RightContainer>
            <Search/>
            <MoreVert/>
        </RightContainer>
    </Header>
  )
}

export default ChatHeader
