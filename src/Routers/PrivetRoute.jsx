import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/Provider/AuthProvider";

const PrivetRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    // Data Loading
    if (loading) {
        return <div className="flex gap-4  p-4 flex-wrap justify-center">
            <img className="w-48 h-48 animate-spin mt-32  lg:mt-32 lg:mb-32 " src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"></img>
        </div>;
    }

    // User  Check
    if (user) {
        return children;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;