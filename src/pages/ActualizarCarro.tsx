import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarCarro: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [valor, setValor] = useState<number | string>('');
    const [imagen, setImagen] = useState('');
    const [nuevo, setNuevo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarro = async () => {
            try {
                const response = await axios.get(`https://localhost:7185/api/carro/${id}`);
                const carro = response.data;
                setModelo(carro.modelo);
                setColor(carro.color);
                setKilometraje(carro.kilometraje);
                setValor(carro.valor);
                setImagen(carro.imagen);
                setNuevo(carro.nuevo);
            } catch (error) {
                console.error('Error fetching carro:', error);
            }
        };

        fetchCarro();
    }, [id]);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`https://localhost:7185/api/carro/${id}`, {
                modelo,
                color,
                kilometraje,
                valor: Number(valor.toString().replace(/[^0-9.-]+/g, "")), // Convertir a número
                imagen,
                nuevo,
                activo: true, // Añadir el campo activo con valor true
                fechaRegistro: new Date().toISOString(),
            });
            navigate('/carros');
        } catch (error) {
            console.error('Error actualizando el carro:', error);
        }
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.-]+/g, ""); // Eliminar caracteres no numéricos
        setValor(numericValue);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Actualizar Carro</h1>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
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

export default ActualizarCarro;