import React from 'react';
import { useSelector } from 'react-redux';

const AdminUsuarios = () => {
  const users = useSelector(state => state.auth.users); // Asumiendo que tienes una lista de usuarios en el estado

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      {/* Aquí puedes agregar la lógica para editar y eliminar usuarios */}
    </div>
  );
};

export default AdminUsuarios;
