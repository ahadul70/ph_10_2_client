import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showpass, setShowpass] = useState(false);

  const { signInUser, Signinwithgoogle } = use(AuthContext);
  const location = useLocation();
  //console.log(location);

  const navigate = useNavigate();

  const handleshowpass = () => setShowpass(!showpass);

  const handleGoogleSignIn = () => {
    Signinwithgoogle()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).then((res) => res.json());

        toast.success(`Welcome ${user.displayName || "User"}!`);
        const from = location.state || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signInUser(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // console.log("✅ User signed in:", user);

        // Save/Sync user with backend DB
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL || "",
        };
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
        } catch (dbErr) {
          console.error("Failed to sync user with DB:", dbErr);
        }

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

            <div className="divider my-4">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn flex items-center justify-center gap-2 bg-white text-black border border-[#e5e5e5] hover:bg-gray-100 transition-all w-full"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path fill="#fff" d="M0 0h512v512H0z" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              <span>Login with Google</span>
            </button>

            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <Link to="/registration" className="link link-hover text-blue-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
