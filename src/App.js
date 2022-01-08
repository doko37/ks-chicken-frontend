import './App.css';
import styled from 'styled-components';
import Home from './components/Home/Home'
import Order from './components/OrderPage/OrderPage'
import ContactUs from './components/ContactUs/ContactUs'
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom'

const InfoBar = styled.div`
  background-color: yellow;
  font-size: 20px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(min-width: 700px) {
    font-size: 20px;
    height: 40px;
  }
`

function App() {
  return (
    <div className="App">
      <InfoBar>We are currently closed until the 13th of January. Happy Holidays!</InfoBar>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Order />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
      </Routes>
    </div>
  );
}

export default App;
