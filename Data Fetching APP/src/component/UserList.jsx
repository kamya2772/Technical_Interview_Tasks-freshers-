import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // using fetch() API (builtin and native method )

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/users")
  //       .then((res) => {
  //         if (!res.ok) throw new Error("Failed to fetch user");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setUser(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //         setIsLoading(falsw);
  //       });
  //   }, []);

  //usign Axios with async/await
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) return <p className="text-center text-8xl">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-8xl">Error Fetching Data : {error}</p>
    );
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {user.map((users) => (
        <div key={users.id} className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold">{users.name} </h2>
          <p className="text-gray-600">{users.email}</p>
          <p className="text-gray-600">{users.phone}</p>
          <a
            href={`http://${users.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {users.website}
          </a>
        </div>
      ))}
    </div>
  );
}

export default UserList;
