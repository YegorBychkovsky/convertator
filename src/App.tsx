import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainBlock from './components/MainBlock';

function App() {
  return (
    <>
      <div className="main">
        <Header />
        <MainBlock />
        <Footer />
      </div>
    </>
  );
}

export default App;
