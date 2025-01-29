import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");  // ✅ Success message state
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id)); // Remove deleted user from UI
    setMessage("User deleted successfully!");  // ✅ Show message

    setTimeout(() => {
      setMessage("");  // ✅ Hide after 3 seconds
    }, 3000);
  };

  return (
    <div>
      <h2>User List</h2>
      {message && <p className="success-message">{message}</p>}  {/* ✅ Display message */}
      <button className="add-btn" onClick={() => navigate("/add")}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(" ")[0]}</td>
              <td>{user.name.split(" ")[1] || ""}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className="edit-btn" onClick={() => navigate(`/edit/${user.id}`, { state: { user } })}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
