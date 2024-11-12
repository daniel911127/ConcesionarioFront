import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearCarro: React.FC = () => {
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [nuevo, setNuevo] = useState(false);
    const navigate = useNavigate();
    const [, setModalIsOpen] = useState(false);
    const [, setModalMessage] = useState('');

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7185/api/carro', {
                modelo,
                color,
                kilometraje,
                valor: Number(valor.toString().replace(/[^0-9.-]+/g, "")), // Convertir a número
                nuevo,
                activo: true, // Añadir el campo activo con valor true
                fechaRegistro: new Date().toISOString(),
            });
            console.log('Carro creado:', response.data);
            navigate('/carros');
        } catch (error) {
            console.error('Error creando el carro:', error);
            if (axios.isAxiosError(error) && error.response) {
                const errorMessages = (error.response.data as any[]).map(err => err.errorMessage).join(', ');
                setModalMessage(errorMessages);
                setModalIsOpen(true);
            }
        }
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.-]+/g, ""); // Eliminar caracteres no numéricos
        setValor(numericValue);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Crear Carro</h1>
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

export default CrearCarro;