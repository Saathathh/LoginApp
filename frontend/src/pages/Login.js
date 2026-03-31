import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { loginUser } from "../services/authService";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(payload);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (requestError) {
      setError(requestError.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />;
}

export default Login;
