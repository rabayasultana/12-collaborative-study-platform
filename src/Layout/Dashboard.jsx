import {  NavLink, Outlet, } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 ">
        {/* Sidebar */}
        <aside className="p-4 border-r shadow-md bg-purple text-white min-h-screen">
          <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
          <ul className="space-y-2">
          <li>
              <NavLink to="view-sessions" className="hover:underline">
                View Booked Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="createNote" className="hover:underline">
                Create Note
              </NavLink>
            </li>
            <li>
              <NavLink to="manageNotes" className="hover:underline">
              Manage Personal Notes
              </NavLink>
            </li>
            <li>
              <NavLink to="materials" className="hover:underline">
              View Study Materials
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