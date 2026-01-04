import React, { useEffect, useState } from 'react';
import useAuth from '../../context/AuthContext/useAuth';
import { NavLink } from 'react-router';
import useAxiosSecurity from '../../context/AuthContext/useAxiosSecurity';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaArrowUp, FaArrowDown, FaBoxOpen, FaShippingFast, FaClipboardCheck } from 'react-icons/fa';

const Overview = () => {
    const { user, role } = useAuth();
    const axiosSecurity = useAxiosSecurity();
    const [stats, setStats] = useState({ imports: 0, exports: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            Promise.all([
                axiosSecurity.get(`/myimports`),
                axiosSecurity.get(`/myexports`),
                (role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'super_admin')
                    ? axiosSecurity.get(`/admin/pending-products`)
                    : Promise.resolve({ data: [] })
            ]).then(([importsRes, exportsRes, pendingRes]) => {
                setStats({
                    imports: importsRes.data.length || 0,
                    exports: exportsRes.data.length || 0,
                    pending: pendingRes.data ? pendingRes.data.length : 0
                });
                setLoading(false);
            }).catch(err => {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            });
        }
    }, [user, role, axiosSecurity]);

    const data = [
        { name: 'Imports', value: stats.imports },
        { name: 'Exports', value: stats.exports },
        { name: 'Pending', value: stats.pending },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="p-6 md:p-10 space-y-8 min-h-full">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, {user?.displayName}</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-sm btn-outline">This Month</button>
                    <button className="btn btn-sm btn-primary">Download Report</button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Imports</p>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.imports}</h3>
                        <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <FaArrowUp /> +12% <span className="text-slate-400 font-normal">from last month</span>
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                        <FaBoxOpen />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Exports</p>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.exports}</h3>
                        <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <FaArrowUp /> +5% <span className="text-slate-400 font-normal">from last month</span>
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center text-xl">
                        <FaShippingFast />
                    </div>
                </div>

                {role === 'admin' ? (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Pending Requests</p>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.pending}</h3>
                            <p className="text-amber-500 text-xs font-bold mt-2">Needs Attention</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-xl flex items-center justify-center text-xl">
                            <FaClipboardCheck />
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                            <p className="text-blue-100 text-sm mb-4">Unlock advanced analytics and priority support.</p>
                            <button className="btn btn-sm bg-white text-blue-600 border-none hover:bg-slate-100">Upgrade Now</button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    </div>
                )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Trade Activity</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Distribution</h3>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-slate-500">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
