import React, { useContext, useEffect, useState } from "react";
import { Importproducts } from "../../components/Importproducts/Importproducts";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";

const Myimports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const axiosSecurity = useAxiosSecurity();
  const [imports, setImports] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecurity.get("/myimports")
        .then(res => setImports(res.data))
        .catch(err => console.error("Error fetching imports:", err));
    }
  }, [user, axiosSecurity]);

  return (
    <>
      <div className=" bg-gradient-to-b from-slate-900 to-slate-800">
        <Importproducts products={imports} />
      </div>
    </>
  );
};

export default Myimports;
