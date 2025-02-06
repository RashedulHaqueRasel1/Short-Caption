import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../component/Login/Login";
import Registration from "../component/Registration/Registration";
import Contact from "../component/Contact/Contact";
import AddCaption from "../component/AddCaption/AddCaption";
import AllCaption from "../component/AllCaption/AllCaption";
import Favorite from "../component/Favorite/Favorite";
import Profile from "../component/Profile/Profile";
import PrivetRoute from "./PrivetRoute";
import LastVisit from "../component/Admin/LastVisit/LastVisit";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'registration',
                element: <Registration></Registration>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            },
            {
                path: 'Add/Caption',
                element: <PrivetRoute><AddCaption></AddCaption></PrivetRoute>
            },
            {
                path: 'dRasel',
                element: <PrivetRoute><AllCaption></AllCaption></PrivetRoute>
            },
            {
                path: 'favorite',
                element: <PrivetRoute><Favorite></Favorite></PrivetRoute>
            },
            {
                path: 'profile',
                element: <PrivetRoute><Profile></Profile></PrivetRoute>
            },
            {
                path: "last-visit",
                element: <LastVisit></LastVisit>
            }
        ]
    }
])