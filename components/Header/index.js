import React from "react";
import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';
import Right from './Right';

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Nav />
      <Right />
    </HeaderWrapper>
  )
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

