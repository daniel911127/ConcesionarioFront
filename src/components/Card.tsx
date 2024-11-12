import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    id: number;
    tipo: 'carro' | 'moto';
    modelo: string;
    color: string;
    kilometraje: string;
    valor: number;
    imagen: string;
    nuevo: boolean;
    fechaRegistro: string;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, tipo, modelo, color, kilometraje, valor, imagen, nuevo, fechaRegistro, onDelete, onUpdate }) => {
    const navigate = useNavigate();
    const formattedDate = new Date(fechaRegistro).toLocaleDateString();

    const handleDelete = async () => {
        try {
            await axios.delete(`https://localhost:7185/api/${tipo}/${id}`);
            onDelete(id);
        } catch (error) {
            console.error(`Error eliminando el ${tipo}:`, error);
        }
    };

    const handleVender = () => {
        navigate(`/vender/${tipo}/${id}`);
    };

    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-sm mx-auto bg-white">
            <div className="relative">
                <img src={imagen} alt={`Imagen de ${modelo}`} className="w-full h-48 object-cover rounded-lg" />
                {nuevo && (
                    <span className="absolute top-2 left-2 bg-stone-400 text-white text-xs font-bold px-2 py-1 rounded">
                        Nuevo
                    </span>
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-800">{modelo}</h2>
                <p className="text-gray-500 text-sm mb-1">Color: {color}</p>
                <p className="text-gray-500 text-sm mb-1">Kilometraje: {kilometraje} km</p>
                <p className="text-gray-700 font-semibold text-lg mb-2">Valor: ${valor.toLocaleString()}</p>
                <p className="text-gray-400 text-xs">Registrado el: {formattedDate}</p>
            </div>
            <div className='flex flex-row justify-normal content-normal'>
                <button onClick={handleVender} className="mt-4 w-full bg-lime-300 hover:bg-lime-500 hover:text-white text-neutral-600 font-thin py-2 rounded mr-2">
                    Vender
                </button>
                <button onClick={() => onUpdate(id)} className="mt-4 w-full bg-blue-300 hover:bg-blue-500 hover:text-white text-neutral-600 font-thin py-2 rounded mr-2">
                    Actualizar
                </button>
                <button onClick={handleDelete} className="mt-4 w-full bg-red-300 hover:bg-red-500 hover:text-white text-neutral-600 font-thin py-2 rounded">
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Card;