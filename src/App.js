import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './containers/home/home';
import Login from './containers/login/login';
import Register from './containers/register/register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
