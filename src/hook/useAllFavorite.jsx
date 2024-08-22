import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import { useContext } from "react";

const useAllFavorite = () => {


    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    const { data: allFavorite = [], refetch } = useQuery({
        queryKey: ['allFavorite'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite/${user?.email}`)
            return res.data;
            
        },
        enabled: !!user?.email
    })

    // console.log(allFavorite)

    return [allFavorite, refetch];
};

export default useAllFavorite;