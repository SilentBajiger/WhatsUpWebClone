import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { AccountContext } from "../../../Context/AccountProvider";
import { getMessages, newMessage } from "../../../service/api";
import Message from "./Message";



const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;
const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px ;
`

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages,setMessages] = useState([]);
  const [file,setFile] = useState();
  const { account ,socket,newMessageFlag,setNewMessageFlag} = useContext(AccountContext);
  const [image,setImage] = useState('')
  const scrollRef = useRef();
  const[incomingMessage,setIncomingMessage] = useState(null);

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setNewMessageFlag(prev=>!prev);
      setIncomingMessage({
        ...data,
        createdAt:Date.now(),
      })
    })
  },[]);

  useEffect(()=>{
    const getMessageDetails = async()=>{
      let data = await getMessages(conversation._id);
      // console.log(data);
      setMessages(data);
    }
    
    conversation._id && getMessageDetails();
  },[person._id,conversation._id,newMessageFlag]);

  useEffect(()=>{
    // console.log("SCrollREd",scrollRef.current.scrollIntoView);
    scrollRef.current?.scrollIntoView({transition:'smooth'});
  },[messages]);

  useEffect(()=>{
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev,incomingMessage]);
  },[incomingMessage,conversation]);

  const sendText = async(e) => {
    // console.log(e);
    // console.log("ok");

    const code = e.which;
    if (code === 13) {
     

      let message={};
      if(!file){
      // console.log("YETAYs");

        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      }
      else{
          // console.log("YETAYNnnnnnnnnnnnnnnnna");
          message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }
      
      // console.log(message);
      socket.current.emit('sendMessage',message);

      await newMessage(message);
      setValue('');
      setFile('');
      setImage('');
      // setMessages(message);
      setNewMessageFlag(prev=>!prev);
    }
  };
  // console.log("ok");

  return (
    <Wrapper>
      <Component>
        {
          messages && messages.map((message,index) =>{

            return <Container ref={scrollRef} key={index}><Message message={message}/></Container>
          })
        }
      </Component>
      <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage}/>
    </Wrapper>
  );
};

export default Messages;
