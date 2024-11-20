import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { getConversation, setConversation } from "../../../service/api";
import { formatDate } from "../../../utils/commonUtils";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});
const Container = styled(Box)`
  display: flex;
`;
const TimeStamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`;
const Text = styled(Typography)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

const Conversation = ({ user }) => {
  const {
    setPerson,
    account,
    newMessageFlag,
    setNewMessageFlag,
    incomingMessage,
    socket,
  } = useContext(AccountContext);
  const [message, setMessages] = useState({});
  const [senderId, setSenderId] = useState("");

  const [typing, setTyping] = useState(false);
  socket.current.on("OnTyping", (e) => {
    // console.log("yes");
    setTyping(true);
    // console.log(e.senderId);
    // console.log(user);
    setSenderId(e.senderId);
  });
  if (typing) {
    setTimeout(() => {
      setTyping(false);
      // console.log("KITI");
    }, 2000);
  }

  socket.current.on("getMessage", (data) => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setMessages({
        text: data?.message,
        timestamp: data?.updatedAt,
        receiverId: user.sub,
      });
    };
    getConversationDetails();
  });

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setMessages({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationDetails();
  }, [newMessageFlag, incomingMessage]);
  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={() => getUser()}>
      <Box>
        <Image src={user.picture} alt="dp" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{user.name}</Typography>
          {message?.text && (
            <TimeStamp>{formatDate(message?.timestamp)}</TimeStamp>
          )}
        </Container>
        <Box>
          <Text>
            {user.sub === senderId
              ? typing
                ? <Text style={{fontWeight:"600",color:"rgba(6,207,156,1)"}}>typing...</Text>
                : message?.text?.includes("localhost")
                ? "media"
                : message.text
              : message?.text?.includes("localhost")
              ? "media"
              : message.text
            }
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
