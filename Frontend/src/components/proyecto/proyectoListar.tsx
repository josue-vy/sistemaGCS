import React, { useEffect, useState } from 'react';
import Sidebar from '../shared/sidebar';
import { listProyecto } from '../../api/proyecto/proyecto.api';

interface Users {
    codigoProyecto: string;
    nombreProyecto: string;
    fechaInicio: string;
    fechaFinal: string;
    estado: string;
}

const ProyectoListar: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
        listProyecto()
            .then((response) => {
                setUsers(response.data as Users[]); // Convierte la respuesta en un array de tipo User
            })
            .catch((error) => {
                console.error('Error al listar usuarios:', error);
            });
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-96 p-5">
                <h2 className="text-2xl font-bold mb-4">Listado de Proyecto</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="text-lg mb-2">
                            <span className="font-semibold">{user.codigoProyecto}, {user.nombreProyecto}, {user.fechaInicio}, {user.fechaFinal}, {user.estado}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProyectoListar;
