'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/user');
        router.refresh();
      } else {
        throw new Error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Agregar Nuevo Usuario</h1>
      
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
            Guardar Usuario
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