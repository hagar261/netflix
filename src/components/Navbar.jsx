import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loginData, logout }) => {
  return (
    <>
      <div className="flex text-center justify-between  z-[100] p-4 w-full absolute">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            {" "}
            NETFLIX{" "}
          </h1>
        </Link>

        {loginData ? (
          <>
            <button
              onClick={logout}
              className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div>
              <Link to="/login">
                <button className="text-white pr-4 cursor-pointer">
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
