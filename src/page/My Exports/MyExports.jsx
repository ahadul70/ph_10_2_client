import React, { useContext, useEffect, useState } from "react";
import { Exportproduct } from "../../components/Exportproduct/Exportproduct";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate, useLocation } from "react-router";

export const MyExports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { user } = useContext(AuthContext);
  const [exports, setExports] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: from } });
    }
  }, [user, navigate, from]);

  // Fetch exports only after user exists
  useEffect(() => {
    if (user?.email) {
      fetch(`https://phserver-nine.vercel.app/myexports?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setExports(data))
        .catch((err) => console.error("Error fetching exports:", err));
    }
  }, [user]);

  return (
    <div className="my-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        My Exported Products
      </h1>
      <Exportproduct products={exports} />
    </div>
  );
};
