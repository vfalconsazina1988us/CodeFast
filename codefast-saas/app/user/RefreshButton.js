'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <button 
      onClick={handleRefresh}
      className={`btn btn-secondary ${isRefreshing ? 'loading' : ''}`}
      disabled={isRefreshing}
    >
      {isRefreshing ? 'Actualizando...' : 'Refrescar Huespedes'}
    </button>
  );
} 