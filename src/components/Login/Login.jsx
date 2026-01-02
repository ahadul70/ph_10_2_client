import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showpass, setShowpass] = useState(false);

  const { signInUser } = use(AuthContext);
  const location = useLocation();
  //console.log(location);

  const navigate = useNavigate();

  const handleshowpass = () => setShowpass(!showpass);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signInUser(email, password)
      .then((userCredential) => {
        //console.log("✅ User signed in:", userCredential.user);
        setEmail("");
        setPassword("");

        // Extract the original route if it exists
        const from = location.state || "/";
        //console.log("Navigating to:", from);

        navigate(from, { replace: true });
        toast.success("🎉 Logged in successfully!");
      })
      .catch((error) => {
        console.error("❌ Error signing in:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSignIn}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showpass ? "text" : "password"}
                  className="input input-bordered w-full pr-16"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleshowpass}
                  className="btn btn-sm absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showpass ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-2">
                <Link to="/forgotpass" className="link link-hover text-sm">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Log In
              </button>
            </fieldset>

            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <Link
                to="/registration"
                className="link link-hover text-blue-500"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
