import './App.css';
import Layout from './components/Container/Layout';
import styled from 'styled-components';

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  font-family: 'Noto Sans', sans-serif;
  text-align: center;
  scroll-behavior: smooth;
`

function App() {
  return (
    <Body>
      <Layout />
    </Body>
  );
}

export default App;
