import { useState, useContext } from "react";
import api from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/auth/login", { email, password });
    login(res.data);
    window.location = "/";
  };

 return (
  <div className="form-box">
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={e => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={e => setPassword(e.target.value)}
    />

    <button className="btn-primary" onClick={submit}>
      Login
    </button>
  </div>
);

}
