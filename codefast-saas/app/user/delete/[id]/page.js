'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DeleteUserPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el usuario');
        router.push('/user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/user');
        router.refresh();
      } else {
        throw new Error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar usuario');
    }
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Eliminar Usuario</h1>
        
        <div className="text-center mb-8">
          <p className="mb-4">¿Está seguro que desea eliminar al usuario?</p>
          <div className="font-semibold">
            <p>Nombre: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Edad: {user?.age}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={handleDelete}
            className="btn btn-error"
          >
            Confirmar Eliminación
          </button>
          <button 
            onClick={() => router.push('/user')}
            className="btn btn-ghost"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
} 