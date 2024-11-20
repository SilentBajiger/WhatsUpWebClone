import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../../service/api";
import { Box, Divider } from "@mui/material";
import Conversation from "./Conversation";
import { AccountContext } from "../../../Context/AccountProvider";
import styled from "@emotion/styled";


const Component = styled(Box)`
  height:81vh;
  overflow:overlay;
`
const StyledDivider = styled(Divider)`
  margin:0 0 0 70px;
  background:#e9edef;
  opacity:0.6;
`

const Conversations = ({text}) => {
  const { account ,socket ,setActiveUsers} = useContext(AccountContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
      // console.log("USERS",response);
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);
 
  useEffect(()=>{
    socket.current.emit('addUsers',account);
    socket.current.on('getUsers',users =>{
      setActiveUsers(users);
    });
  },[account]);

  return (
    <Component>
      {users.map((user,index) => {
        return user.sub !== account.sub &&  <><Conversation user={user}  key={index}/><StyledDivider/></>;
      })}
    </Component>
  );
};

export default Conversations;
