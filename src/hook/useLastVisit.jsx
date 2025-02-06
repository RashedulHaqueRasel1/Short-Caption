import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useLastVisit = () => {


    const axiosPublic = useAxiosPublic();


    const { data: lastVisit = [], refetch } = useQuery({
        queryKey: ['lastVisit'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/last-visits`)
            // console.log(res.data)
            return res.data;
        },
    })

    console.log(lastVisit)

    return [lastVisit, refetch];
};

export default useLastVisit;