import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Reg() {
  const { createUser, Signinwithgoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await Signinwithgoogle();
      const user = result.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      toast.success(`Welcome ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordStrengthRegex.test(password)) {
      toast.error("Password must be 8+ chars with Uppercase, Lowercase, Number, and Special Char.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      if (name || photoURL) {
        await updateProfile(user, { displayName: name, photoURL });
      }

      const newUser = {
        name: name || user.displayName,
        email: user.email,
        image: photoURL || user.photoURL || "",
      };

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.code === "auth/email-already-in-use" ? "Email already registered." : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row-reverse">

        {/* Right Side - Image/Info */}
        <div className="md:w-1/2 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join the Hub</h2>
            <p className="text-slate-300 text-lg">
              Create an account to start your global trade journey. It takes less than 2 minutes.
            </p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-40"></div>

          <div className="relative z-10 mt-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <p className="text-sm">"The best platform for managing our imports. Highly recommended!"</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-amber-400"></div>
                <span className="text-xs font-bold text-amber-400">XYZ Logistics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center md:text-left">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">

            <div className="form-control">
              <label className="label text-slate-600 dark:text-slate-400 font-medium">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label className="label text-slate-600 dark:text-slate-400 font-medium">Profile Image URL</label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
                  placeholder="https://..."
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
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
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowpass(!showpass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showpass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full shadow-lg shadow-blue-500/20" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </form>

          <div className="divider text-slate-400 text-sm my-6">OR SIGN UP WITH</div>

          <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-3 hover:bg-slate-50 border-slate-300 dark:border-slate-600 dark:text-white">
            <FaGoogle className="text-red-500" /> Google
          </button>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
