'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      console.log('Iniciando fetchUsers');
      const response = await fetch('/api/users');
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      console.log('Usuarios obtenidos:', data);
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error detallado:', err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4 md:p-8">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Lista de huespedes</h1>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <button 
            onClick={() => {
              fetchUsers();
              router.refresh();
            }}
            className="btn btn-secondary w-full md:w-auto"
          >
            Refrescar Lista
          </button>
          <Link 
            href="/user/new" 
            className="btn btn-primary w-full md:w-auto"
          >
            Agregar huesped
          </Link>
        </div>
      </div>
      
      {/* Vista móvil: Cards */}
      <div className="md:hidden space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id.toString()} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{user.name || 'N/A'}</h2>
                <p>Email: {user.email || 'N/A'}</p>
                <p>Edad: {user.age || 'N/A'}</p>
                <div className="card-actions justify-end mt-4">
                  <Link 
                    href={`/user/edit/${user._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Editar
                  </Link>
                  <Link 
                    href={`/user/delete/${user._id}`}
                    className="btn btn-sm btn-error"
                  >
                    Eliminar
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            No hay huespedes registrados
          </div>
        )}
      </div>

      {/* Vista desktop: Tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-base-200">Nombre</th>
              <th className="bg-base-200">Email</th>
              <th className="bg-base-200">Edad</th>
              <th className="bg-base-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id.toString()}>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.age || 'N/A'}</td>
                  <td className="space-x-2">
                    <Link 
                      href={`/user/edit/${user._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Editar
                    </Link>
                    <Link 
                      href={`/user/delete/${user._id}`}
                      className="btn btn-sm btn-error"
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay huespedes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total de huespedes: {users.length}
      </div>
    </div>
  );
} 