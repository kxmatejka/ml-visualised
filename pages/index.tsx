import dynamic from 'next-server/dynamic'
import { createGlobalStyle } from 'styled-components'

const Home = dynamic(import('../src/pages/home').then(page => page.Home), {
  ssr: false,
})

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`

export default () => (
  <>
    <GlobalStyle/>
    <Home/>
  </>
)
