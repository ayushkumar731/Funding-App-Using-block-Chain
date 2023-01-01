import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav = () => {
  const Router = useRouter();
  return (
    <NavWrapper>
      <Link href={"/"}>
        <NavLinks active={Router.pathname === "/" ? true : false}>
          Campaings
        </NavLinks>
      </Link>
      <Link href={"/create-campaign"}>
        <NavLinks
          active={Router.pathname === "/create-campaign" ? true : false}
        >
          Create Campaing
        </NavLinks>
      </Link>
      <Link href={"/dashboard"}>
        <NavLinks active={Router.pathname === "/dashboard" ? true : false}>
          Dashboard
        </NavLinks>
      </Link>
    </NavWrapper>
  );
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
`;

const NavLinks = styled.div`
  background-color: ${(props) => props.active ?  props.theme.bgSubDiv : props.theme.bgDiv};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  height: 100%;
  font-family: "Roboto";
  margin: 7px;
  padding: 0 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: small;
  color: ${(props) => props.theme.color};
`;
