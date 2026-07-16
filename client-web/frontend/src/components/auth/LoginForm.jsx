import { loginUser } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Login Failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[62%] flex items-center justify-center bg-slate-100">
      <div className="w-[520px] rounded-3xl bg-white p-12 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">

        {/* Heading */}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}

        <form className="mt-10" onSubmit={handleLogin}>

          {/* Email */}

          <div className="mb-6">

            <div className="mb-2 flex items-center gap-3">
              <FaEnvelope className="text-slate-500" />
              <label className="font-semibold text-slate-700">
                Email
              </label>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-gray-300 px-4 text-[15px] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Password */}

          <div className="mb-4">

            <div className="mb-2 flex items-center gap-2">
              <FaLock className="text-slate-500" />
              <label className="font-semibold text-slate-700">
                Password
              </label>
            </div>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-12 text-[15px] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* Error Message */}

          {error && (
            <div className="mb-5 rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Remember */}

          <div className="mb-8 flex items-center justify-between">

            <label className="flex items-center gap-2 text-[15px] text-slate-600">

              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
              />

              Remember Me

            </label>

            <button
              type="button"
              className="text-[15px] font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className={`h-12 w-full rounded-xl text-lg font-semibold text-white shadow-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default LoginForm;