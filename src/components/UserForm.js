import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../api";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const existingUser = location.state?.user;

  const [user, setUser] = useState({
    name: "",
    email: "",
    company: { name: "" }
  });
  const [message, setMessage] = useState("");  // ✅ Success message state

  useEffect(() => {
    if (existingUser) {
      setUser(existingUser);
    }
  }, [existingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateUser(id, user);
      setMessage("User updated successfully!");  // ✅ Show success message
    } else {
      await addUser(user);
      setMessage("User added successfully!");  // ✅ Show success message
    }

    setTimeout(() => {
      setMessage("");  // ✅ Hide after 3 seconds
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      {message && <p className="success-message">{message}</p>}  {/* ✅ Display message */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="company" value={user.company.name} onChange={handleChange} placeholder="Department" required />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;
