import {  NavLink, Outlet, } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
    // const {logOut} = useAuth();
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const [isStudent] = useStudent();
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 ">
        {/* Sidebar */}
        <aside className="p-4 border-r shadow-md bg-purple text-white min-h-screen">
          <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
          <ul className="space-y-2">
          {
            isAdmin ? <>
            <li>
              <NavLink to="/dashboard/adminHome" className="hover:underline">
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewAllUsers" className="hover:underline">
                View All Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewAllSessions" className="hover:underline">
                View All Study Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewAllMaterials" className="hover:underline">
              View All Materials
              </NavLink>
            </li>
            </> : isTutor?
            <>
            <li>
              <NavLink to="/dashboard/createSession" className="hover:underline">
                Create Session
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewSession" className="hover:underline">
                View Session
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/uploadMaterials" className="hover:underline">
              Upload Materials
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewMaterials" className="hover:underline">
              View Materials
              </NavLink>
            </li>
            </> : isStudent?
            <>
            <li>
              <NavLink to="/dashboard/viewBookedSession" className="hover:underline">
                View Booked Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/createNote" className="hover:underline">
                Create Note
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewNotes" className="hover:underline">
              Manage Personal Notes
              </NavLink>
            </li>
            <li>
              <NavLink to="viewBookedMaterials" className="hover:underline">
              View Study Materials
              </NavLink>
            </li>
            </> : <></>
          }
            {/* shared */}
            <hr />
            <li>
              <NavLink to="/" className="hover:underline">
              Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="hover:underline">
              Logout
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:underline">
              Register
              </NavLink>
            </li>
          </ul>
          
        </aside>

        {/* Main Content */}
        <main className="col-span-3 p-4">
          {/* Placeholder for Route Components */}
          <Outlet></Outlet>
        </main>
      </div>
    </div>
        </div>
    );
};

export default Dashboard;