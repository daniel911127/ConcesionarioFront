import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarVenta: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [nombreComprador, setNombreComprador] = useState('');
    const [telefonoComprador, setTelefonoComprador] = useState('');
    const [correoComprador, setCorreoComprador] = useState('');
    const [vehiculoId, setVehiculoId] = useState<number | null>(null);
    const [tipoVehiculo, setTipoVehiculo] = useState<'carro' | 'moto' | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenta = async () => {
            try {
                const response = await axios.get(`https://localhost:7185/api/venta/${id}`);
                const venta = response.data;
                setNombreComprador(venta.nombreComprador);
                setTelefonoComprador(venta.telefonoComprador);
                setCorreoComprador(venta.correoComprador);
                setVehiculoId(venta.carroId || venta.motoId);
                setTipoVehiculo(venta.carroId ? 'carro' : 'moto');
            } catch (error) {
                console.error('Error fetching venta:', error);
            }
        };

        fetchVenta();
    }, [id]);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`https://localhost:7185/api/venta/${id}`, {
                nombreComprador,
                telefonoComprador,
                correoComprador,
                [`${tipoVehiculo}Id`]: vehiculoId,
            });
            navigate('/ventas');
        } catch (error) {
            console.error('Error actualizando la venta:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Actualizar Venta</h1>
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
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default ActualizarVenta;