import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './features/Authentication/authenticationSlice';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Router from './components/Router/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>  
      </header>    */}
      { isAuthenticated ?
      ( 
        <>
          <Header title='Application'/>          
          <Router/>          
        </>
      ): <Login/> }
    </div>
  );
}

export default App;
