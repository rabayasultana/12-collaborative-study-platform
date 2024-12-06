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
import CreateStudy from "../pages/Dashboard/Tutor/CreateStudy/CreateStudy";
import ViewSession from "../pages/Dashboard/Tutor/ViewSession/ViewSession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterial/UploadMaterial";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
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
        // tutor
        {
          path: 'createSession',
          element: <CreateStudy></CreateStudy>
        },
        {
          path: 'viewSession',
          element: <ViewSession></ViewSession>
        },
        {
          path: 'uploadMaterials',
          element: <UploadMaterials></UploadMaterials>
        },
      ]
    }
  ]);