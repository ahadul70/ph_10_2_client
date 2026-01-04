import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInUser, Signinwithgoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await Signinwithgoogle();
      const user = result.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      // Sync with DB
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.success(`Welcome ${user.displayName}!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      // Sync (optional if already handled in registration, but good for login to update last login)
      const user = { email: email }; // fallback if we don't have full user obj here instantly
      // We skip full sync here for brevity, usually done in AuthProvider or context

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@example.com");
    setPassword("Admin123!"); // Assuming this exists or is a placeholder
    toast("Demo credentials filled!", { icon: "ℹ️" });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Image/Info */}
        <div className="md:w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-blue-100 text-lg">
              Access your dashboard to manage shipments, track orders, and connect with global partners.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <p className="text-sm opacity-80 mb-2">For testing purposes:</p>
            <button
              onClick={fillDemoAdmin}
              className="btn btn-sm btn-outline text-white border-white/50 hover:bg-white hover:text-blue-600"
            >
              Auto-fill Admin Demo
            </button>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center md:text-left">Log In to ImpExpHub</h2>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="form-control">
              <label className="label text-slate-600 dark:text-slate-400 font-medium">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-slate-600 dark:text-slate-400 font-medium">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showpass ? "text" : "password"}
                  className="input input-bordered w-full pl-11 pr-12 bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
                  placeholder="Wait"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowpass(!showpass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showpass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right mt-1">
                <Link to="/forgotpass" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-lg shadow-blue-500/20"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Log In"}
            </button>
          </form>

          <div className="divider text-slate-400 text-sm my-6">OR LOGIN WITH</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full gap-3 hover:bg-slate-50 hover:text-slate-900 border-slate-300 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
          >
            <FaGoogle className="text-red-500" /> Google
          </button>

          <p className="text-center mt-8 text-slate-500 text-sm">
            New here? <Link to="/registration" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
