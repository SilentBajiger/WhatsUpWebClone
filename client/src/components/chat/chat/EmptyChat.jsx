import { Box, Typography,Divider } from '@mui/material'
import React from 'react'
import {emptyChatImage} from '../../../constants/data';
import styled from '@emotion/styled';

const Component = styled(Box)`
    background:#f8f9fa;
    padding: 30px 0;
    text-align:center;
    height:88vh;
`;
// may error due to above height

const Container = styled(Box)`
  padding: 0 200px;
`
const Image = styled('img')({
  marginTop:100,
  width:400
});

const Title = styled(Typography)`
  font-size:32px;
  margin:25px 0 10px 0;
  font-family:inherit;
  font-weight:300;
  color:#41525d;
`;

const Subtitle = styled(Typography)`
  font-size:14px;
  color:#667781;
  font-weight:400;
  font-family:inherit;
`
const StyledDivider = styled(Divider)`
  margin: 40px 0;
  opacity: 0.4;
`

const EmptyChat = () => {
  return (
    <Component>
      <Container>
        <Image src={emptyChatImage} alt="img" />
        <Title>WhatsApp Web</Title>
        <Subtitle>Now send and receive messages without keeping your phone online.</Subtitle>
        <Subtitle>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</Subtitle>
        <StyledDivider/>
      </Container>
    </Component>
  )
}

export default EmptyChat
