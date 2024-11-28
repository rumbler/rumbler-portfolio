import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Pipelines from './components/Pipelines';
import Projects from './components/Projects';
import Contact from './components/Contact';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
  }
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <main>
        <Pipelines />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
