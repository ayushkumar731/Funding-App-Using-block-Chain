import React from "react";
import styled from 'styled-components';

const Logo = () => {
  return (
    <LogoWrapper>Fund Raiser</LogoWrapper>
  )
};

export default Logo;

const LogoWrapper = styled.h1`
  font-weight: bold;
  font-size: 30px;
  font-family: 'Poppins';
`