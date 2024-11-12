import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import Carros from './pages/Carros';
import Motos from './pages/Motos';
import Ventas from './pages/Ventas';
import CrearCarro from './pages/CrearCarro';
import CrearMotos from './pages/CrearMotos';
import ActualizarMoto from './pages/ActualizarMoto';
import ActualizarCarro from './pages/ActualizarCarro';
import Vender from './pages/Vender';
import ListadoCarros from './pages/ListadoCarros'; 
import ListadoMotos from './pages/ListadoMotos';
import ActualizarVenta from './pages/ActualizarVenta';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carros" element={<Carros />} />
          <Route path="/carros/crear" element={<CrearCarro />} />
          <Route path="/carros/actualizar/:id" element={<ActualizarCarro />} />
          <Route path="/motos" element={<Motos />} />
          <Route path="/motos/crear" element={<CrearMotos />} />
          <Route path="/motos/actualizar/:id" element={<ActualizarMoto />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/vender/:tipo/:id" element={<Vender />} />
          <Route path="/listcarros" element={<ListadoCarros />} /> 
          <Route path="/listmotos" element={<ListadoMotos />} />
          <Route path= "/ventas/actualizar/:id" element={<ActualizarVenta />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;