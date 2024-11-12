import React from 'react';

const Home: React.FC = () => (
    <div className="container mx-auto px-14 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">Prueba Tecnica SINCO AYF</h1>
        <p className="text-lg text-center text-gray-700 mb-12">
            Esta es la página de inicio de tu aplicación. Aquí puedes dar una breve descripción de lo que tu aplicación hace o mostrar un mensaje de bienvenida.
        </p>
        <div className="flex justify-center">
            <div>

                <div className="flex justify-center mb-5">
                    <a
                        href="https://github.com/daniel911127/ConcesionarioFront" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:underline"
                    >
                        FrontEnd
                    </a>
                </div>
                <div className="flex justify-center">
                    <a
                        href="https://github.com/daniel911127/ConcesionarioBack" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:underline"
                    >
                        Backend
                    </a>
                </div>
            </div>
        </div>
    </div>
);


export default Home;