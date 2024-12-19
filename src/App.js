import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [empId, setEmpId] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const submitfunc = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmpassword || !empId || !department || !dateOfJoining || !role || !phoneNumber) {
      return setMessage("Please enter all the fields");
    }
    if (password !== confirmpassword) {
      return setMessage("Passwords do not match");
    }

    const response = await fetch("https://fsdbackend.onrender.com/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, empId, department, dateOfJoining, role, phoneNumber }),
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
        <input
          type="text"
          placeholder="EMPLOYEE ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="DEPARTMENT"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />
        <input
          type="date"
          placeholder="DATE OF JOINING"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="ROLE"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="PHONE NUMBER"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
                <th>Employee ID</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Role</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.empId}</td>
                  <td>{user.department}</td>
                  <td>{user.dateOfJoining}</td>
                  <td>{user.role}</td>
                  <td>{user.phoneNumber}</td>
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
