import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ThemeToggle from "../Darktoogle/themetoggle";
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt, FaCog } from "react-icons/fa";

export default function NavBar() {
  const { user, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signoutUser()
      .then(() => navigate("/"))
      .catch((error) => console.error("❌ Sign-out error:", error));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/allproducts" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
           {/* Placeholder Logo or Image */}
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            IE
          </div>
          <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-slate-800 dark:text-white' : 'text-slate-800 dark:text-white'}`}>
            ImpExp<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors hover:text-blue-600 ${
                      isActive ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-slate-200 dark:border-slate-700">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "https://ui-avatars.com/api/?name=User"} alt="avatar" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-box w-60 border border-slate-100 dark:border-slate-800">
                <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                  <span className="text-xs font-bold opacity-50 uppercase tracking-wider">Signed in as</span>
                  <span className="text-sm font-semibold truncate block">{user.displayName || user.email}</span>
                </li>
                <li>
                  <Link to="/dashboard/overview" className="py-3">
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="py-3">
                    <FaUserCircle className="mr-2" /> Profile
                  </Link>
                </li>
                 <li>
                  <Link to="/dashboard/settings" className="py-3">
                    <FaCog className="mr-2" /> Settings
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={handleSignOut} className="py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2.5 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition">
                Log in
              </Link>
              <Link to="/registration" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-2xl text-slate-800 dark:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
             <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-800 ${
                    isActive ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
          ))}
           {user ? (
             <>
              <Link to="/dashboard/overview" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full mt-4">Dashboard</Link>
              <button onClick={() => {handleSignOut(); setMobileMenuOpen(false);}} className="btn btn-outline w-full text-red-500 hover:bg-red-50 hover:border-red-500">Log Out</button>
             </>
           ) : (
             <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline w-full">Log in</Link>
                <Link to="/registration" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full">Get Started</Link>
             </div>
           )}
        </div>
      )}
    </nav>
  );
}
