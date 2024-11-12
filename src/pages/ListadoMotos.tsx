import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Moto {
    id: number;
    modelo: string;
    precio: number;
}

const ListadoMotos: React.FC = () => {
    const [motos, setMotos] = useState<Moto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7185/api/ListadoMoto', {
                    headers: {
                        'accept': 'text/plain',
                    },
                });
                setMotos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Listado de Motos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {motos.map((moto) => (
                    <div key={moto.id} className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-sm mx-auto bg-white">
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold text-gray-800">{moto.modelo}</h2>
                            <p className="text-gray-700 font-semibold text-lg mb-2">Precio: ${moto.precio.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListadoMotos;