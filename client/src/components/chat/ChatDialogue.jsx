import { Dialog, Box, styled } from "@mui/material";
import React, { useContext } from "react";
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { AccountContext } from "../../Context/AccountProvider";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 70%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const dailogstyle = {
  height: "96%",
  margin: "20px",
  width: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "none",
  borderRadius: "0px",
};

const ChatDialogue = () => {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dailogstyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Component>
        <LeftComponent>
          <Menu />
        </LeftComponent>
        <RightComponent>
          {/* <EmptyChat/> */}
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
          {/* <ChatBox/> */}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatDialogue;
