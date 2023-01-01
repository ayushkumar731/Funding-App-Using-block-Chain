import React, { useContext } from "react";
import styled from "styled-components";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { App } from "../Layout";

const Right = () => {
  const ThemeToggler = useContext(App);

  return (
    <RightWrapper>
      <ThemeToggle>
        {ThemeToggler.theme === 'light' ? <DarkModeIcon onClick={ThemeToggler.changeTheme} /> : <Brightness7Icon onClick={ThemeToggler.changeTheme} />}
      </ThemeToggle>
    </RightWrapper>
  );
};

export default Right;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
`;

const ThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  height: 100%;
  padding: 5px;
  width: 40px;
  border-radius: 12px;
  cursor: pointer;
`;
