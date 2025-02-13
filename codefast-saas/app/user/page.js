import Link from 'next/link';
import clientPromise from "@/libs/mongo";

async function UserPage() {
  try {
    const client = await clientPromise;
    const db = client.db("production"); // Especificamos el nombre de la base de datos
    const users = await db.collection("users").find({}).toArray();

    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Lista de Usuarios</h1>
          <Link 
            href="/user/new" 
            className="btn btn-primary"
          >
            Agregar Usuario
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-base-200">ID</th>
                <th className="bg-base-200">Nombre</th>
                <th className="bg-base-200">Email</th>
                <th className="bg-base-200">Edad</th>
                <th className="bg-base-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id.toString()}>
                    <td>{index + 1}</td>
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
                  <td colSpan="5" className="text-center">
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Total de usuarios: {users.length}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error al cargar los usuarios. Por favor, intente más tarde.</span>
        </div>
      </div>
    );
  }
}

export default UserPage; 