import { Box, InputBase } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import styled from '@emotion/styled';
import { UploadFile } from '../../../service/api';
import { AccountContext } from '../../../Context/AccountProvider';

const Container = styled(Box)`
    height:62px;
    background:#ededed;
    display:flex;
    align-items:center;
    padding:0px 15px;
    &> *{
        margin: 5px;
        color:#919191;
    }
`

const Search  =styled(Box)`
    background-color:white;
    border-radius:14px;
    width:calc(94% - 100px);
    `

const InputFeild = styled(InputBase)`
    width:100%;
    padding:20px;
    height:20px;
    padding-left:25px;
    font-size:14px;
`;

const ClipIcon = styled(AttachFileIcon)`
    transform:rotate(225deg);
`
const Footer = ({sendText,setValue,value,file,setFile,setImage}) => {

    const {socket,account,person} = useContext(AccountContext);
    const [typing,setTyping] = useState(false);


    const SendTyping = ()=>{
        socket.current.emit("senderTyping",{senderId:account.sub,receiverId:person.sub});
    }
    
    

    useEffect(()=>{
        const getImage = async()=>{
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append('file',file);
                const response = await UploadFile(data);
                console.log("RESPONSE: ",response);
                setImage(response.data);
            }
        }
        getImage();
    },[file]);
    const onFileChange=(e)=>{
        console.log(e);
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

  return (
    <Container>
        <InsertEmoticonOutlinedIcon/>
        <label htmlFor='fileInput'>
        <ClipIcon/>
        </label>
       
        <input type='file'
        id='fileInput'
        style={{display:'none'}}
        onChange={(e)=>onFileChange(e)}
        />
        <Search>
            <InputFeild
            placeholder='Type a message'
            onChange={(e)=>{setValue(e.target.value);SendTyping()}}
            onKeyPress={(e)=>sendText(e)}
            value={value}
            />
        </Search>
        <MicIcon/>
    </Container>
  )
}

export default Footer
