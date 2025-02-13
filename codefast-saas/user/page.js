import clientPromise from "@/libs/mongo";

async function UserPage() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection("users").find({}).toArray();

    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Users List</h1>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                {/* Añade más columnas según los campos que tengas */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id.toString()}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  {/* Añade más campos según tu estructura de datos */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="text-center py-4">No users found in the database.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return (
      <div className="p-8">
        <p className="text-red-500">Error loading users. Please try again later.</p>
      </div>
    );
  }
}

export default UserPage;