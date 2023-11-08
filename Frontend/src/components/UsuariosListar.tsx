import React, { useEffect, useState } from 'react';
import Sidebar from '../components/shared/sidebar';
import { listUsers } from '../api/auth.api';

interface Users {
    nombre: string;
    apellido: string;
    correo: string;
    // Otras propiedades de usuario, si las hubiera
}

const UsuariosListar: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
        listUsers()
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
                <h2 className="text-2xl font-bold mb-4">Listado de Usuarios</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="text-lg mb-2">
                            <span className="font-semibold">{user.nombre}, {user.apellido}, {user.correo}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsuariosListar;
