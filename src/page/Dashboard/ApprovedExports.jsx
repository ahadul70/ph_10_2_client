import React, { useEffect, useState } from 'react';
import useAxiosSecurity from '../../context/AuthContext/useAxiosSecurity';

const ApprovedExports = () => {
    const [products, setProducts] = useState([]);
    const axiosSecurity = useAxiosSecurity();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApproved = async () => {
            try {
                const res = await axiosSecurity.get("/admin/approved-exports");
                console.log("Approved Products Response:", res.data);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching approved products:", err.response || err);
            } finally {
                setLoading(false);
            }
        };
        fetchApproved();
    }, [axiosSecurity]);

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="p-6 bg-slate-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Approved Export Products</h1>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                    <p>No approved products found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-xl">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Seller</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Origin</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id} className="hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-none">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={p.image || "https://via.placeholder.com/150"} alt={p.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{p.name}</td>
                                    <td>{p.seller}</td>
                                    <td>${p.price}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.originCountry || p.country}</td>
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

export default ApprovedExports;
