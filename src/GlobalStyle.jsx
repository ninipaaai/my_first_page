import { createGlobalStyle } from 'styled-components';

/* Глобальный стиль документа */
const GlobalStyle = createGlobalStyle`
  /* Сброс настроек */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth; /* плавное передвижение по якорям */
    scroll-padding-top: 88px;
  }

  body {
    min-height: 100vh;
    font-family: sans-serif;
    line-height: 1.6;
    background-color: white;
  }

  h1 {
    line-height: 1.2;
    font-weight: bold;
    letter-spacing: -0.02em;
    font-size:35px;
    text-align:left;
    margin-left:30px;
    }

  a { color: inherit; text-decoration: none; }

  ul, ol { list-style: none; }

  img, svg {
    display: block;
    max-width: 100%;
  }
`;

export default GlobalStyle;