import { Link } from "react-router-dom";

const StudentHome = () => {
    return (
        <div>
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Dashboard</h1>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="bg-white p-4 border-r shadow-md">
          <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard/student/view-sessions" className="hover:underline">
                View Booked Sessions
              </Link>
            </li>
            <li>
              <Link to="/dashboard/student/create-note" className="hover:underline">
                Create Note
              </Link>
            </li>
            <li>
              <Link to="/dashboard/student/manage-notes" className="hover:underline">
                Manage Personal Notes
              </Link>
            </li>
            <li>
              <Link to="/dashboard/student/materials" className="hover:underline">
                View Study Materials
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-span-3 p-4">
          {/* Placeholder for Route Components */}
          {/* <Outlet /> */}
        </main>
      </div>
    </div>
  {/* );
}; */}
        </div>
    );
};

export default StudentHome;