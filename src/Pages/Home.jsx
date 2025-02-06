import { useContext, useState, useEffect } from "react";
import AllCard from "./AllCard";
import useAllCaption from "../hook/useAllCaption";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import Search from "./Search";
import { Toaster } from 'react-hot-toast';


const Home = () => {
    const [shuffledCaptions, setShuffledCaptions] = useState([]);

    // Fetch captions with search and pagination
    const [allCaption, refetch] = useAllCaption();
    const { loading } = useContext(AuthContext);

    // Shuffle captions on each refresh
    useEffect(() => {
        if (allCaption.length > 0) {
            const shuffled = [...allCaption].sort(() => Math.random() - 0.5);
            setShuffledCaptions(shuffled);

        }
    }, [allCaption]);

    refetch()

 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Pagination calculations
    const totalPages = Math.ceil(shuffledCaptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCaption = shuffledCaptions.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    // Show loading indicator
    if (loading) {
        return (
            <div className="flex gap-4 p-4 flex-wrap justify-center">
                <img
                    className="w-48 h-48 animate-spin mt-32 lg:mt-32 lg:mb-32"
                    src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                    alt="Loading icon"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto container">
            {/* Search Input */}
            <div className="p-4">
                <Search></Search>
            </div>

            {/* Caption Cards */}
            <div className="grid grid-cols-1 justify-center p-4 gap-4 lg:mt-4 md:grid-cols-2 lg:grid-cols-3">
                {currentCaption.map((caption) => (
                    <AllCard key={caption._id} allCaption={caption} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 mb-8 gap-2">
                <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-white bg-[#375189] hover:bg-[#5b81d3] rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={`px-4 py-2 rounded-full ${number === currentPage ? "bg-[#375189] text-white" : "bg-gray-200 text-black"}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-white bg-[#375189] hover:bg-[#5b81d3] rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default Home;
