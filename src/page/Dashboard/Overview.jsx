import React, { useEffect, useState } from 'react';
import useAuth from '../../context/AuthContext/useAuth';
import { NavLink } from 'react-router';
import useAxiosSecurity from '../../context/AuthContext/useAxiosSecurity';

const Overview = () => {
    const { user, role } = useAuth();
    const axiosSecurity = useAxiosSecurity();
    const [importCount, setImportCount] = useState(0);
    const [exportCount, setExportCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        if (user?.email) {
            // Fetch imports count
            axiosSecurity.get(`/myimports`)
                .then(res => setImportCount(res.data.length || 0))
                .catch(err => console.error("Error fetching import count:", err));

            // Fetch exports count
            axiosSecurity.get(`/myexports`)
                .then(res => setExportCount(res.data.length || 0))
                .catch(err => console.error("Error fetching export count:", err));

            // Fetch pending count for admins
            if (role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'super_admin') {
                axiosSecurity.get(`/admin/pending-products`)
                    .then(res => setPendingCount(res.data.length || 0))
                    .catch(err => console.error("Error fetching pending count:", err));
            }
        }
    }, [user, role, axiosSecurity]);

    return (
        <div className="p-8 space-y-8">
            <header className="space-y-2">
                <h1 className="text-4xl font-extrabold text-blue-400">Dashboard Overview</h1>
                <p className="text-lg text-gray-400">Welcome to your <span className="text-white font-semibold">ImportExport Hub</span> dashboard. Summary of your global trade activities.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {/* Imports Card */}
                <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl hover:border-blue-500/50 transition duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <span className="text-5xl font-black text-white">{importCount}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Total Imports</h3>
                    <p className="text-gray-400 mb-6">Track and manage your incoming global shipments.</p>
                    <NavLink
                        to="/dashboard/my-imports"
                        className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition"
                    >
                        View Records
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </NavLink>
                </div>

                {/* Exports Card */}
                <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl hover:border-green-500/50 transition duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-green-500/10 rounded-2xl group-hover:bg-green-500/20 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </div>
                        <span className="text-5xl font-black text-white">{exportCount}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Total Exports</h3>
                    <p className="text-gray-400 mb-6">Control and monitor your outbound global products.</p>
                    <NavLink
                        to="/dashboard/my-exports"
                        className="inline-flex items-center text-green-400 font-semibold hover:text-green-300 transition"
                    >
                        Manage Exports
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </NavLink>
                </div>

                {/* Admin Pending Approvals Card */}
                {(role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'super_admin') && (
                    <div className="bg-slate-800 border border-yellow-500/30 p-8 rounded-3xl shadow-2xl hover:border-yellow-500/60 transition duration-300 group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-4 bg-yellow-500/10 rounded-2xl group-hover:bg-yellow-500/20 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <span className="text-5xl font-black text-white">{pendingCount}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pending Approvals</h3>
                        <p className="text-gray-400 mb-6">Products awaiting your review before going public.</p>
                        <NavLink
                            to="/dashboard/pending-exports"
                            className="inline-flex items-center text-yellow-500 font-semibold hover:text-yellow-400 transition"
                        >
                            Approve Products
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overview;
