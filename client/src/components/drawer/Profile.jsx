import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import styled from "@emotion/styled";

const ImageContainer = styled(Box)`
    display:flex;
    justify-content:center;

`

const Image = styled('img')({
    width:200,
    height:200,
    borderRadius:'50%',
    padding:'25px 0px',
});

const BoxWrapper = styled(Box)`
    background:#ffffff;
    padding:12px 30px 2px;
    box-shadow: 0 3px 3px rgba(0,0,0,0.08);
    & :first-child{
        font-size:13px;
        color:#009668;
        font-weight:200;
    };
    & :last-child{
        margin:14px 0;
        color: #4a4a4a;
    }
`
const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p{
        font-size:13px;
        color:#667781;
    }
`

const Profile = () => {
    const {account} = useContext(AccountContext);
    
    
  
    return (
    <>
      <ImageContainer>
        <Image src={account.picture} alt="dp" />    
      </ImageContainer>
      <BoxWrapper>
        <Typography>Your Name</Typography>
        <Typography>{account.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>Eat! Sleep! Code! Repeat!!!</Typography>
      </BoxWrapper>
    </>
  );
};

export default Profile;
