import './App.css';
import Home from './components/Home/Home'
import Order from './components/OrderPage/OrderPage'
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Order />}/>
      </Routes>

    </div>
  );
}

export default App;
