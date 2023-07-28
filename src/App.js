import { useDispatch } from 'react-redux';
import './App.css';
import LayoutBackup from './components/Container/LayoutBackup';
import Layout from './components/Container/Layout'
import styled from 'styled-components';
import { useEffect } from 'react';
import { getChickenItems, getSideItems } from './features/menu/menuSlice';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getChickenItems())
    dispatch(getSideItems())
  }, [])

  return (
    <div className="ctn">
      <Layout />
    </div>
  );
}

export default App;