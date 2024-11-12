import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Motos: React.FC = () => {
    interface Moto {
        motoId: number;
        modelo: string;
        color: string;
        kilometraje: string;
        valor: number;
        imagen: string;
        nuevo: boolean;
        fechaRegistro: string;
        activo: boolean; // Asegúrate de que el campo activo esté definido
    }
    
    const [motos, setMotos] = useState<Moto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7185/api/moto');
                setMotos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;

    // Filtrar las motos activas
    const activeMotos = motos.filter(moto => moto.activo);

    const handleDelete = (id: number) => {
        setMotos(prevMotos => prevMotos.filter(moto => moto.motoId !== id));
    };

    const handleCreate = () => {
        navigate('/motos/crear');
    };

    const handleUpdate = (id: number) => {
        navigate(`/motos/actualizar/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Motos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeMotos.map((moto) => (
                    <Card
                        key={moto.motoId}
                        id={moto.motoId}
                        tipo="moto"
                        modelo={moto.modelo}
                        color={moto.color}
                        kilometraje={moto.kilometraje}
                        valor={moto.valor}
                        imagen={moto.imagen}
                        nuevo={moto.nuevo}
                        fechaRegistro={moto.fechaRegistro}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>

            <button onClick={handleCreate} className="mt-4 w-40 bg-blue-300 hover:bg-blue-500 hover:text-white text-neutral-600 font-thin py-2 rounded mr-2">
                Crear
            </button>
        </div>
    );
}

export default Motos;