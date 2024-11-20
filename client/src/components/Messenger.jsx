import React, { useContext } from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import LoginDialog from "./account/LoginDialog";
import { AccountContext } from "../Context/AccountProvider";
import ChatDialogue from "./chat/ChatDialogue";


const Component = styled(Box)`
  margin: -10px;
  height: 100vh;
  width: 100vw;
  background-color: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
  background-color: #00A884;
  box-shadow: none;
`;


const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      
      {account ? (<>
        <Header>
            <Toolbar>

            </Toolbar>
          </Header>
          <ChatDialogue/>
      
      </>
        
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
