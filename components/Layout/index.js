import React, { useState, createContext } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "../Header";
import themes from "./themes";

const App = createContext();

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <App.Provider value={{ changeTheme, theme }}>
      <ThemeProvider theme={themes[theme]}>
        <LayoutWrapper>
          <GlobalStyle />
          <Header />
          {children}
        </LayoutWrapper>
      </ThemeProvider>
    </App.Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  background-image: ${(props) => props.theme.bgImage};
  color: ${(props) => props.theme.color};
`;

export default Layout;

export { App };
