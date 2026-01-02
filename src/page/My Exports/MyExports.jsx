import React, { useContext, useEffect, useState } from "react";
import { Exportproduct } from "../../components/Exportproduct/Exportproduct";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate, useLocation } from "react-router";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";

const MyExports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const axiosSecurity = useAxiosSecurity();
  const [exports, setExports] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecurity.get("/myexports")
        .then((res) => setExports(res.data))
        .catch((err) => console.error("Error fetching exports:", err));
    }
  }, [user, axiosSecurity]);

  return (
    <div className="my-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        My Exported Products
      </h1>
      <Exportproduct products={exports} />
    </div>
  );
};

export default MyExports;
