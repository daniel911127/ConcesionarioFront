import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Carros: React.FC = () => {
    interface Carro {
        carroId: number;
        modelo: string;
        color: string;
        kilometraje: string;
        valor: number;
        imagen: string;
        nuevo: boolean;
        fechaRegistro: string;
        activo: boolean; // Asegúrate de que el campo activo esté definido
    }
    
    const [carros, setCarros] = useState<Carro[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7185/api/carro');
                setCarros(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;

    // Filtrar los carros activos
    const activeCarros = carros.filter(carro => carro.activo);

    const handleDelete = (id: number) => {
        setCarros(prevCarros => prevCarros.filter(carro => carro.carroId !== id));
    };

    const handleCreate = () => {
        navigate('/carros/crear');
    };

    const handleUpdate = (id: number) => {
        navigate(`/carros/actualizar/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Carros</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCarros.map((carro) => (
                    <Card
                        key={carro.carroId}
                        id={carro.carroId}
                        tipo="carro"
                        modelo={carro.modelo}
                        color={carro.color}
                        kilometraje={carro.kilometraje}
                        valor={carro.valor}
                        imagen={carro.imagen}
                        nuevo={carro.nuevo}
                        fechaRegistro={carro.fechaRegistro}
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

export default Carros;