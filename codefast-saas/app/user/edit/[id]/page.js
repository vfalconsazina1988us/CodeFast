'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUserPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (res.ok) {
          const user = await res.json();
          setFormData({
            name: user.name,
            email: user.email,
            age: user.age
          });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/user');
        router.refresh();
      } else {
        throw new Error('Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar usuario');
    }
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Usuario</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Edad</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            required
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary">
            Actualizar Usuario
          </button>
          <button 
            type="button" 
            className="btn btn-ghost"
            onClick={() => router.push('/user')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
} 
 
 
