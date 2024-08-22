import { useContext, useEffect, useState } from "react";
import AllCard from "./AllCard";
import useAllCaption from "../hook/useAllCaption";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import { IoSearch } from "react-icons/io5";



const Home = () => {

    const [search, setSearch] = useState('');
    const [allCaption, refetch] = useAllCaption(search);
    const { loading } = useContext(AuthContext)




    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };


    const [shuffledPosts, setShuffledPosts] = useState([]);

    useEffect(() => {
        setShuffledPosts(shuffleArray([...allCaption]));
        refetch()
    }, [allCaption]);



    // console.log(shuffledPosts)




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        // search.data = data;

        // console.log(data.search)
        setSearch(data.search)

        refetch()
    }
    refetch()
    console.log(search)



    // Loading 
    if (loading) return <div className="flex gap-4  p-4 flex-wrap justify-center">
        <img className="w-48 h-48 animate-spin mt-32  lg:mt-32 lg:mb-32 " src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"></img>
    </div>;

    return (
        <div className="mx-auto container">


            {/*-------------- Search Input Start -----------*/}
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex relative justify-center lg:ml-96 rounded-md w-full px-4 max-w-xl   lg:mt-0">
                        <input type="text" placeholder="Search Caption..."
                            className="w-full p-3 rounded-md mt-24 md:mt-4 md:ml-28 lg:mt-4   border-blue-300   input-bordered border       "
                            {...register("search")} />
                        {errors.search}
                        <button
                            className="inline-flex items-center mt-24 md:mt-4 lg:mt-4   gap-2 bg-indigo-600 text-white text-lg font-semibold   px-3 rounded-r-md">
                            <span>search</span>
                            <span className="hidden md:block">
                                <IoSearch />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            {/*-------------- Search Input End -----------*/}



            <div className="grid grid-cols-1 justify-center items-center p-4 space-x-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    shuffledPosts.map((allCaption) => <AllCard key={allCaption._id} allCaption={allCaption}></AllCard>)
                }
            </div>

        </div>
    );
};

export default Home;