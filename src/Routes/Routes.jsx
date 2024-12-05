import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import StudentHome from "../pages/Dashboard/StudentHome/StudentHome";
import Dashboard from "../Layout/Dashboard";
import CreateNote from "../pages/Dashboard/Student/CreateNote/CreateNote";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch('/studySession.json')
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
          path: "/dashboard/student",
          element: <StudentHome></StudentHome>
      }
      ]
    },
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'createNote',
          element: <CreateNote></CreateNote>
        },
      ]
    }
  ]);