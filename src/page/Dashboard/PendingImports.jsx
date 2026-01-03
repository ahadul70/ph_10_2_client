import React, { useEffect, useState } from 'react';
import useAxiosSecurity from '../../context/AuthContext/useAxiosSecurity';
import toast, { Toaster } from 'react-hot-toast';

const PendingImports = () => {
    const [pending, setPending] = useState([]);
    const axiosSecurity = useAxiosSecurity();

    useEffect(() => {
        fetchPending();
    }, [axiosSecurity]);

    const fetchPending = async () => {
        try {
            const res = await axiosSecurity.get("/admin/pending-imports");
            setPending(res.data);
        } catch (err) {
            console.error("Error fetching pending imports:", err);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await axiosSecurity.patch(`/admin/imports/approve/${id}`);
            if (res.data.modifiedCount > 0) {
                toast.success("Import Approved!");
                setPending(prev => prev.filter(p => p._id !== id));
            }
        } catch (err) {
            console.error("Error approving import:", err);
            toast.error("Failed to approve import.");
        }
    };

    return (
        <div className="p-6 min-h-screen bg-slate-900 text-white">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6 text-center">Pending Import Approvals</h1>

            {pending.length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-xl text-gray-400">No imports waiting for approval.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pending.map((item) => (
                        <div key={item._id} className="bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-700 flex flex-col">
                            {item.image && (
                                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                            )}
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                                <p className="text-blue-400 text-sm italic mb-1">Importer: {item.importer_email}</p>
                                <p className="text-gray-400 text-xs mb-2">ID: {item._id}</p>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                                    <p>Price: ${item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Origin: {item.country || item.originCountry}</p>
                                    <p>Rating: ⭐ {item.rating}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleApprove(item._id)}
                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-bold transition-all shadow-md active:scale-95"
                            >
                                Approve Import
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingImports;
