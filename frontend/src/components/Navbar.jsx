import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ background: "#111", padding: 15, color: "white", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: 20 }}>Jobs</Link>

        {user?.role === "candidate" && (
          <>
            <Link to="/applications" style={{ color: "white", marginRight: 20 }}>Applications</Link>
            <Link to="/favourites" style={{ color: "white", marginRight: 20 }}>Saved</Link>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" style={{ color: "white", marginRight: 20 }}>Admin</Link>
        )}
      </div>

      <div>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", marginRight: 20 }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
