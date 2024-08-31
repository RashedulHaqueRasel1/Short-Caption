import { useContext, useState } from "react";
import AllCard from "./AllCard";
import useAllCaption from "../hook/useAllCaption";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import { IoSearch } from "react-icons/io5";
import useCaptionCount from "../hook/useCaptionCount";



const Home = () => {

    const [search, setSearch] = useState('');
    // const [itemPerPage, setItemPerPage] = useState(12)
    const itemPerPage = 12 ;
    const [currentPage, SetCurrentPage] = useState(0);

    const [allCaption, refetch] = useAllCaption(search, currentPage, itemPerPage);
    const [captionCount] = useCaptionCount();
    const { loading } = useContext(AuthContext)


    // pagination
    const { count } = captionCount;
    const numberOfPages = Math.ceil(count / itemPerPage)

    // console.log(numberOfPages)

    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i)

    }

    // // Page Select 
    // const handleItemPerPage = e => {
    //     const val = parseInt(e.target.value)
    //     setItemPerPage(val)
    //     SetCurrentPage(0)
    // }



    // Search Bar Handle
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setSearch(data.search)
        refetch()
    }
    refetch()




    // handle Prev Page
    const handlePrevPage = () => {
        if (currentPage > 0) {
            SetCurrentPage(currentPage - 1)
            refetch()
        }
    }

    // handle Next Page
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            SetCurrentPage(currentPage + 1)
            refetch()
        }
    }



    // Loading 
    if (loading) return <div className="flex gap-4  p-4 flex-wrap justify-center">
        <img className="w-48 h-48 animate-spin mt-32  lg:mt-32 lg:mb-32 " src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"></img>
    </div>;

    refetch()


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
                            className="inline-flex items-center mt-24 md:mt-4 lg:mt-4   gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold   px-3 rounded-r-md">
                            <span>search</span>
                            <span className="hidden md:block">
                                <IoSearch />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            {/*-------------- Search Input End -----------*/}




            {/* All card Map */}
            <div className="grid grid-cols-1 justify-center items-center p-4 space-x-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    allCaption.map((allCaption) => <AllCard key={allCaption._id} allCaption={allCaption}></AllCard>)
                }
            </div>



            {/* ----------- Pagination Star ---------- */}
            <div className="text-center mb-6 mt-4 ">
                <button onClick={handlePrevPage} className="btn mr-3 hover:text-blue-500 ">Prev</button>
                {
                    pages.map((page, idx) => <button
                        onClick={() => SetCurrentPage(page)}
                        key={page + 1}
                        className={currentPage === page ? `bg-blue-200 btn text-black hover:text-white ml-2` : `btn bg-blue-600  text-black hover:text-white ml-2`}
                    >{idx + 1}</button>)
                }
                <button onClick={handleNextPage} className="btn ml-3 hover:text-blue-500 ">Next</button>

                {/* <select value={itemPerPage} onChange={handleItemPerPage} className="select select-primary w-20 ml-4">
                    <option value='5'>12</option>
                    <option value='10'>21</option>
                    <option value='15'>35</option>
                    <option value='20'>50</option>
                </select> */}
            </div>
            {/* ----------- Pagination End ---------- */}


        </div>
    );
};

export default Home;