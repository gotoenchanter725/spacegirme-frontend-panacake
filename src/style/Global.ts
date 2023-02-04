/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/newline-after-import
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle<{bg?: any}>`
  body {
    background-color: ${({ theme }) => {
      if(theme.isDark)
       return theme.colors.background
      return undefined;
    }};
    
    background-image: ${({ theme }) => {
      if(!theme.isDark)
       return 'url("https://user-images.githubusercontent.com/40233733/142796094-d66151ea-9505-41d8-a179-0a5f545f9c7f.png")'
      return undefined;
    }};
    img {
      height: auto;
      /* max-width: 100%; */
    }
  }
`

export default GlobalStyle
