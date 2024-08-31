import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCaptionCount = () => {



    const axiosPublic = useAxiosPublic();


    const { data: captionCount = [], refetch } = useQuery({
        queryKey: ['captionCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/caption-Count`)
            // console.log(res.data)
            return res.data;
        },
    })

    // console.log(captionCount)

    return [captionCount, refetch];
};

export default useCaptionCount;