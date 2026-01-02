import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { forgotPass } = useContext(AuthContext);

  const handleForgotPass = (e) => {
    e.preventDefault();
    setError("");
forgotPass(email)
  .then(() => {
    alert("✅ Reset link sent! Opening Gmail...");
    window.open("https://mail.google.com/mail/u/1/#inbox", "_blank");
  })
  
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <h1 className="text-4xl text-center text-white mb-4">Forgot Password</h1>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
        <form className="card-body" onSubmit={handleForgotPass}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-neutral mt-4"
              a
              href="https://mail.google.com/mail/u/1/#spam"
              target="_blank"
            >
              Send Reset Link
            </button>
          </fieldset>

          {error && <p className="text-red-500 mt-2">{`❌ ${error}`}</p>}
        </form>
      </div>
    </>
  );
}
