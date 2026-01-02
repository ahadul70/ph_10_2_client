import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function Reg() {
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpass, setShowpass] = useState(false);

  const handleGoogleSignIn = () => {
    authInfo
      .Signinwithgoogle()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch("https://phserver-nine.vercel.app/users", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).then((res) =>
          res.json().then((data) => {
            //console.log("data after user save", data);
          })
        );

        // ✅ Only show toast after successful sign-in
        toast.success(`Welcome ${user.displayName || "User"}!`);
        //console.log("Google sign-in successful:", user, token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(
          "Google sign-in error:",
          errorCode,
          errorMessage,
          email,
          credential
        );
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  const handleshowpass = () => setShowpass(!showpass);

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordStrengthRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await authInfo.createUser(email, password);
      const user = userCredential.user;

      if (name || photoURL) {
        await updateProfile(user, { displayName: name, photoURL });
      }

      // Reset form
      setEmail("");
      setPassword("");
      setName("");
      setPhotoURL("");

      toast.success("🎉 Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-6 relative">
        <div className="flex justify-center -mt-16 mb-4">
          {" "}
          {photoURL ? (
            <img
              src={photoURL}
              alt="Avatar Preview"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-400 font-semibold">
              {" "}
              Avatar{" "}
            </div>
          )}{" "}
        </div>
        <form className="card-body pt-0" onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Paste image URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <a
            href="https://postimages.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm mb-2 inline-block"
          >
            Upload here (Postimages.org)
          </a>

          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mb-2"
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

          <button
            type="submit"
            className={`btn btn-neutral w-full mt-4 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-hover text-blue-500">
              Login
            </Link>
          </p>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn flex items-center gap-2 bg-white text-black border border-[#e5e5e5] hover:bg-gray-100 transition-all"
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
      </div>
    </div>
  );
}
