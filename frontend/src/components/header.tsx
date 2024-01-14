import { Link } from "react-router-dom";

import { useAppContext } from "../contexts/app-context";

import { SignOut } from "./sign-out";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="font-semibold tracking-tighter text-white hover:text-gray-300"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="font-semibold tracking-tighter text-white hover:text-gray-300"
              >
                My Hotels
              </Link>
              <SignOut />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};
