import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-200 text-gray-500 shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="logo.png" // Cambia esta ruta a la de tu logo
            alt="Logo"
            className="h-12 w-12 mr-3"
          />
          <span className="text-xl font-bold">CONCESIONARIO</span>
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-cyan-950">
            Inicio
          </Link>
          <Link to="/carros" className="hover:text-cyan-950">
            Carros
          </Link>
          <Link to="/motos" className="hover:text-cyan-950">
            Motos
          </Link>
          <Link to="/listcarros" className="hover:text-cyan-950">
            Listado de carros
          </Link>
          <Link to="/listmotos" className="hover:text-cyan-950">
            Listado de motos
          </Link>
          <Link to="/ventas" className="hover:text-cyan-950">
            Ventas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
