import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCaption = () => {


    const axiosPublic = useAxiosPublic();


    const { data: allCaption = [], refetch } = useQuery({
        queryKey: ['allCaption'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/adminCaption`)
            // console.log(res.data)
            return res.data;
        },
    })

    console.log(allCaption)

    return [allCaption, refetch];
};

export default useCaption;