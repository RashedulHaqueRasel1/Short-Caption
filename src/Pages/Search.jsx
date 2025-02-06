import { useState } from "react";
import { Link } from "react-router-dom";
import useAllCaption from "../hook/useAllCaption";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const Search = () => {
    const [allCaption] = useAllCaption();
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAllCaption = allCaption.filter((prod) =>
        prod.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // copy Caption
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Caption copied to clipboard!')
        });

    };



    return (
        <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-96">
            <div className="w-full flex">
                <input
                    type="text"
                    placeholder="Search Caption..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full text-gray-500 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />
            </div>

            {searchTerm && (
                <div className="absolute top-full left-0 p-3 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-auto z-50 mt-2 lg:mt-4 ">
                    {filteredAllCaption.length > 0 ? (
                        filteredAllCaption.map((result) => {
                            const truncateName = (caption, charLimit) => {
                                return caption.length > charLimit ? caption.slice(0, charLimit) + "..." : caption;
                            };

                            return (
                                <Link
                                    key={result._id}
                                    className="flex justify-start items-center gap-4 p-2 shadow-md rounded-lg border bg-blue-400 hover:bg-gray-100 transition-colors duration-200  text-black"
                                    onClick={() => handleCopy(result.caption)}

                                >
                                    <section className="w-full lg:w-2/3 text-sm lg:text-base space-y-1 ">
                                        <p className="font-bold text-sm lg:text-base ">
                                            {truncateName(result.caption, 16)}
                                        </p>
                                        <p className="text-gray-600">{result.caption}</p>

                                    </section>
                                    
                                    <FaCopy className="text-black" />
                                </Link>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 px-3 py-2">No Results found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
