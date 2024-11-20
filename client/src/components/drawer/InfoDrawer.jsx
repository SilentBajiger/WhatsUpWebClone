import { Box, Drawer, Typography, styled } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Profile from "./Profile";

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: bold;
  }
`;
const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;
const Text = styled(Typography)`
  font-size: 18px;
`;

const drawerStyle = {
  left: 20,
  top: 15,
  height: "95%",
  boxShadow: "none",
  width: "30%",
};

const InfoDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <Header>
        <ArrowBackIcon onClick={() => setOpen(false)} />
        <Text>Profile</Text>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
