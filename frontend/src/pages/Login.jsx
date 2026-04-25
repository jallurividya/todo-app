import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful ");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full text-white p-2 rounded transition cursor-pointer 
            ${loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup redirect */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-500 cursor-pointer font-medium"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}