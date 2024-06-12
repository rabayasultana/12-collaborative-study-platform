import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/images/logo.png"
import { AuthContext } from "../../../components/Authprovider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const navLinks = (
    <>
      <li className="font-bold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/addBook">Add Book</NavLink>
      </li>

      <li className="font-bold">
        <NavLink to="/allBooks">All Books</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/borrowedBooks">Borrowed Books</NavLink>
      </li>
    </>
  );

  return (
    <div className="mb-10 h-[120px] pt-4">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl  text-sky-700 font-bold">
            <div className="flex gap-3">
              <img className="h-10 w-10" src={logo} alt="" />
              <span>Bookworm Haven</span>
            </div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{navLinks}</ul>
        </div>


        <div className="navbar-end">
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center gap-2">
              <span className="text-xl">
                  {user?.displayName}
                </span>
                <Link to="/update">
                  <img
                    className="h-16 rounded-full"
                    src={
                      user?.photoURL || "https://imgbb.host/images/DfdvE.png"
                    }
                    alt=""
                  />
                </Link>
                
              </div>
              <button
                onClick={handleLogOut}
                className="btn text-2xl bg-sky-700 text-white ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              
              <NavLink to="/login">
                <button className="btn bg-sky-700 text-xl text-white ml-1">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn bg-sky-700 text-xl text-white ml-1">
                  Register
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
