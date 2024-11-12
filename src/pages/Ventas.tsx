import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ventas: React.FC = () => {
    interface Venta {
        ventaId: number;
        nombreComprador: string;
        correoComprador: string;
        telefonoComprador: string;
        carroId: number | null;
        motoId: number | null;
    }
    
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [loading, setLoading] = useState(true);
    const [vehiculos, setVehiculos] = useState<{ [key: number]: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7185/api/venta');
                setVentas(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchVehiculoNombre = async (id: number, tipo: 'carro' | 'moto') => {
            try {
                const response = await axios.get(`https://localhost:7185/api/${tipo}/${id}`);
                const nombreVehiculo = response.data.modelo;
                setVehiculos(prev => ({ ...prev, [id]: nombreVehiculo }));
            } catch (error) {
                console.error(`Error fetching ${tipo} data:`, error);
            }
        };

        ventas.forEach(venta => {
            if (venta.carroId !== null && !vehiculos[venta.carroId]) {
                fetchVehiculoNombre(venta.carroId, 'carro');
            }
            if (venta.motoId !== null && !vehiculos[venta.motoId]) {
                fetchVehiculoNombre(venta.motoId, 'moto');
            }
        });
    }, [ventas]);

    if (loading) return <div>Cargando...</div>;

    const handleEdit = (id: number) => {
        navigate(`/ventas/actualizar/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://localhost:7185/api/venta/${id}`);
            setVentas(prevVentas => prevVentas.filter(venta => venta.ventaId !== id));
        } catch (error) {
            console.error('Error eliminando la venta:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Ventas</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/5 px-4 py-2">Nombre</th>
                        <th className="w-1/5 px-4 py-2">Correo</th>
                        <th className="w-1/5 px-4 py-2">Teléfono</th>
                        <th className="w-1/5 px-4 py-2">Vehículo</th>
                        <th className="w-1/5 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.ventaId}>
                            <td className="border px-4 py-2">{venta.nombreComprador}</td>
                            <td className="border px-4 py-2">{venta.correoComprador}</td>
                            <td className="border px-4 py-2">{venta.telefonoComprador}</td>
                            <td className="border px-4 py-2">
                                {venta.carroId !== null ? vehiculos[venta.carroId] : vehiculos[venta.motoId || 0]}
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(venta.ventaId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(venta.ventaId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ventas;