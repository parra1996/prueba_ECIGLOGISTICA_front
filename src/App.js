import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './containers/home/home';
import Login from './containers/login/login';
import Register from './containers/register/register'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import Admin from './containers/admin/admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
