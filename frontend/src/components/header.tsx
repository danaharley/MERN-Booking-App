import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </header>
  );
};
