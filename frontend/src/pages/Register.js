import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { registerUser } from "../services/authService";

function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    setError("");
    setLoading(true);

    try {
      await registerUser(payload);

      navigate("/login");
    } catch (requestError) {
      setError(requestError.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />;
}

export default Register;
