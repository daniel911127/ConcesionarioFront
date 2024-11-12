import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Vender: React.FC = () => {
    const { tipo, id } = useParams<{ tipo: string; id: string }>();
    const [nombreComprador, setNombreComprador] = useState('');
    const [telefonoComprador, setTelefonoComprador] = useState('');
    const [correoComprador, setCorreoComprador] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const ventaData = {
                ventaId: 0,
                nombreComprador,
                telefonoComprador,
                correoComprador,
                [`${tipo}Id`]: Number(id),
            };
            await axios.post('https://localhost:7185/api/Venta', ventaData, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'text/plain',
                },
            });
            navigate('/ventas');
        } catch (error) {
            console.error('Error realizando la venta:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Datos del Comprador</h1>
            <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        value={nombreComprador}
                        onChange={(e) => setNombreComprador(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input
                        type="text"
                        value={telefonoComprador}
                        onChange={(e) => setTelefonoComprador(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                    <input
                        type="email"
                        value={correoComprador}
                        onChange={(e) => setCorreoComprador(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Vender
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Vender;