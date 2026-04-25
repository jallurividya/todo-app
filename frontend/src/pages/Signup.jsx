import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { name, email, password, phone } = form;

    if (!name || !email || !password || !phone) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", form);

      toast.success("Signup successful ");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center text-orange-500 mb-5">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full text-white p-2 rounded transition cursor-pointer 
            ${loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"}`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Login redirect */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}