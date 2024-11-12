import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearMoto: React.FC = () => {
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [imagen] = useState('');
    const [cilindraje, setCilindraje] = useState('');
    const [velocidades, setVelocidades] = useState('');
    const [nuevo, setNuevo] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('https://localhost:7185/api/moto', {
                modelo,
                color,
                kilometraje,
                valor: Number(valor.toString().replace(/[^0-9.-]+/g, "")), // Convertir a número
                imagen,
                cilindraje,
                velocidades,
                nuevo,
                activo: true, // Añadir el campo activo con valor true
                fechaRegistro: new Date().toISOString(),
            });
            navigate('/motos');
        } catch (error) {
            console.error('Error creando la moto:', error);
        }
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.-]+/g, ""); // Eliminar caracteres no numéricos
        setValor(numericValue);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Crear Moto</h1>
            <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Modelo:</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Kilometraje:</label>
                    <input
                        type="text"
                        value={kilometraje}
                        onChange={(e) => setKilometraje(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
                    <input
                        type="text"
                        value={valor}
                        onChange={handleValorChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Cilindraje:</label>
                    <input
                        type="text"
                        value={cilindraje}
                        onChange={(e) => setCilindraje(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Velocidades:</label>
                    <input
                        type="text"
                        value={velocidades}
                        onChange={(e) => setVelocidades(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nuevo:</label>
                    <input
                        type="checkbox"
                        checked={nuevo}
                        onChange={(e) => setNuevo(e.target.checked)}
                        className="mr-2 leading-tight"
                    />
                    <span className="text-sm">Sí</span>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default CrearMoto;