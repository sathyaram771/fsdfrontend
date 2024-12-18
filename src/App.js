import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // State to hold user data

  const submitfunc = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmpassword) {
      return setMessage("Please enter all the fields");
    }
    if (password !== confirmpassword) {
      return setMessage("Passwords do not match");
    }

    const response = await fetch("https://fsdbackend.onrender.com/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  const fetchUsers = async () => {
    const response = await fetch("https://fsdbackend.onrender.com/getUsers");
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REGISTER</h1>
      <form onSubmit={submitfunc}>
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="CONFIRMPASSWORD"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <br />
        <button type="submit">REGISTER</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>

      <button onClick={fetchUsers} style={{ marginTop: "20px" }}>
        Fetch All Users
      </button>
      <div style={{ marginTop: "20px" }}>
        <h2>Users List</h2>
        {users.length > 0 ? (
          <table border="1" style={{ margin: "0 auto" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default App;
