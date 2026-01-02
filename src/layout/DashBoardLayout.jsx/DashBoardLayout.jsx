import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import useAuth from "../../context/AuthContext/useAuth";

export default function DashBoardLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { role } = useAuth();

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* NAVBAR (Mobile Only) */}
                <nav className="navbar w-full bg-base-300 lg:hidden">
                    <label
                        htmlFor="dashboard-drawer"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <div className="text-xl font-bold px-4">ImportExport Dashboard</div>
                </nav>

                {/* PAGE CONTENT */}
                <main className="flex-1 bg-base-200 p-4 min-h-full">
                    <Outlet />
                </main>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side z-20">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <div
                    className={`flex min-h-full flex-col items-start bg-base-100 transition-all duration-300 
            ${isCollapsed ? "w-16" : "w-72"}`}
                >
                    <ul className="menu w-full p-4">

                        {/* SIDEBAR HEADER */}
                        <li className="mb-4 flex items-center justify-between">
                            <Link
                                to="/"
                                className={`text-xl font-bold p-2 ${isCollapsed ? "w-full text-center" : ""}`}
                            >
                                {isCollapsed ? "IE" : "ImpExp Hub"}
                            </Link>

                            {/* collapse button */}
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="btn btn-circle btn-ghost btn-sm hidden lg:flex"
                            >
                                {!isCollapsed ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        </li>

                        <div className="px-4 py-2 mb-2 bg-base-300/50 rounded-xl flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest opacity-70">Role: {role || 'Loading...'}</span>}
                        </div>

                        {/* MENU ITEMS */}
                        <li>
                            <NavLink
                                to="/dashboard/overview"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="Overview"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m7-7l7 7M5 10v10h3m10-11l2 2v10h-3m-6 0v-4h4v4" />
                                </svg>
                                {!isCollapsed && <span>Overview</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-imports"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="My Imports"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a5 5 0 00-9.288 0M7 20H2v-2a3 3 0 015.356-1.857" />
                                </svg>
                                {!isCollapsed && <span>My Imports</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-exports"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="My Exports"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14V7H5v14z" />
                                </svg>
                                {!isCollapsed && <span>My Exports</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/add-exports"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="Add Exports"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                {!isCollapsed && <span>Add Exports</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/payment-history"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="Payment History"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                {!isCollapsed && <span>Payment History</span>}
                            </NavLink>
                        </li>
                        {/* ADMIN LINKS */}
                        {(role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'super_admin') && (
                            <>
                                <div className="divider opacity-50">Admin</div>
                                <li>
                                    <NavLink
                                        to="/dashboard/pending-imports"
                                        className={isCollapsed ? "tooltip tooltip-right" : ""}
                                        data-tip="Pending Imports"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {!isCollapsed && <span>Pending Imports</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/approved-imports"
                                        className={isCollapsed ? "tooltip tooltip-right" : ""}
                                        data-tip="Approved Imports"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {!isCollapsed && <span>Approved Imports</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/pending-exports"
                                        className={isCollapsed ? "tooltip tooltip-right" : ""}
                                        data-tip="Pending Exports"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {!isCollapsed && <span>Pending Exports</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/approved-exports"
                                        className={isCollapsed ? "tooltip tooltip-right" : ""}
                                        data-tip="Approved Exports"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {!isCollapsed && <span>Approved Exports</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/manage-users"
                                        className={isCollapsed ? "tooltip tooltip-right" : ""}
                                        data-tip="Manage Users"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm11 12v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                        </svg>
                                        {!isCollapsed && <span>Manage Users</span>}
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Divider */}
                        <div className="divider"></div>

                        {/* Back Home */}
                        <li>
                            <Link
                                to="/"
                                className={isCollapsed ? "tooltip tooltip-right" : ""}
                                data-tip="Home"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 12l9-9 9 9v10H5a2 2 0 01-2-2V12z" />
                                </svg>
                                {!isCollapsed && <span>Home</span>}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
