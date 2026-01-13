import { useState } from "react";
import api from "../../api/axiosInstance";

export default function Register() {
  const [form,setForm] = useState({ name:"", email:"", password:"", role:"candidate" });

  const submit = async () => {
    await api.post("/auth/register", form);
    window.location="/login";
  };

  return (
  <div className="form-box">
    <h2>Create Account</h2>

    <input
      placeholder="Name"
      onChange={e => setForm({ ...form, name: e.target.value })}
    />

    <input
      placeholder="Email"
      onChange={e => setForm({ ...form, email: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={e => setForm({ ...form, password: e.target.value })}
    />

    <select onChange={e => setForm({ ...form, role: e.target.value })}>
      <option value="candidate">Candidate</option>
      <option value="admin">Admin</option>
    </select>

    <button className="btn-primary" onClick={submit}>
      Register
    </button>
  </div>
);

}
