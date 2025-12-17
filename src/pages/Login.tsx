import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(loginUser({ username, password }));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h1>Connexion OGSL</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
