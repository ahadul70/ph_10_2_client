import React, { useEffect, useState } from 'react';
import useAxiosSecurity from '../../context/AuthContext/useAxiosSecurity';

const ApprovedImports = () => {
    const [imports, setImports] = useState([]);
    const axiosSecurity = useAxiosSecurity();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApproved = async () => {
            try {
                const res = await axiosSecurity.get("/admin/approved-imports");
                setImports(res.data);
            } catch (err) {
                console.error("Error fetching approved imports:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApproved();
    }, [axiosSecurity]);

    if (loading) return <div className="text-center p-10 text-white">Loading...</div>;

    return (
        <div className="p-6 bg-slate-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Approved Imports</h1>
            
            {imports.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                    <p>No approved imports found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-xl">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Importer</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Origin</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {imports.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-none">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{item.name}</td>
                                    <td className="text-blue-300">{item.importer_email}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.country || item.originCountry}</td>
                                    <td>
                                        <div className="badge badge-success gap-2 text-white">
                                            Approved
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApprovedImports;
