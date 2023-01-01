import React from "react";
import styled from 'styled-components';

const Nav = () => {
  return (
    <NavWrapper>
      <NavLinks>Campaings</NavLinks>
      <NavLinks>Create Campaing</NavLinks>
      <NavLinks>Dashboard</NavLinks>
    </NavWrapper>
  )
};

export default Nav;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 50%;
  border-radius: 10px;
`

const NavLinks = styled.div`
  background-color: ${(props) => props.theme.bgSubDiv};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  height: 100%;
  font-family: 'Roboto';
  margin: 7px;
  padding: 0 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: small;
`