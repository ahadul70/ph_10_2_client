import React from "react";
import { Link } from "react-router";


export default function Errorpage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-500 mb-6">Oops! Nothing to see here.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
