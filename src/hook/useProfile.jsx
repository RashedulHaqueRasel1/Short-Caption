import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Auth/Provider/AuthProvider";

const useProfile = () => {

    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure();


    const { data: profile = [], refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            // console.log(res.data)
            return res.data;
        },
    })

    // console.log(profile)

    return [profile, refetch];
};


export default useProfile;