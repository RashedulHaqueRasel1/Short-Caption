import { MdDeleteForever } from "react-icons/md";
import useAllFavorite from "../../hook/useAllFavorite";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useHook/useAxiosSecure";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { Toaster } from 'react-hot-toast';

const Favorite = () => {

    const [allFavorite, refetch] = useAllFavorite();
    const axiosSecure = useAxiosSecure();


    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure Favorite Caption deleted ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result.isConfirmed)
                axiosSecure.delete(`/favorite/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Favorite Caption has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
            refetch()
        });
    }


    // copy Caption
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Caption copied to clipboard!')
        });

    };




    return (
        <div className="mx-auto container mb-20">

            <div>
                <div>
                    <h1 className="text-center text-3xl text-white font-bold  my-6">Favorite Caption</h1>
                </div>

                <div className="overflow-x-auto">



                    <table className="table mt-6 lg:mt-0">
                        {/* head */}
                        <thead>
                            <tr className="border border-blue-300 rounded-2xl font-bold  text-xs text-white">
                                <th>Date</th>
                                <th>Caption</th>
                                <th>Copy</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {allFavorite?.map(favorite => <tr key={favorite._id} className=" bg-blue-200 hover:bg-blue-300 rounded-2xl">

                                <td className="text-black font-medium">
                                    {favorite.date}
                                </td>

                                <td className="text-black font-medium">
                                    {favorite.caption}
                                </td>




                                <td className="px-6 py-4">
                                    <button onClick={() => handleCopy(favorite.caption)} className="inline-flex items-center   justify-center w-full px-4 py-4 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black cursor-pointer"><FaCopy /></button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(favorite?._id)} className="inline-flex items-center   justify-center w-full px-4 py-4 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-red-500 hover:bg-transparent hover:outline hover:text-black cursor-pointer"><MdDeleteForever /></button>
                                </td>

                            </tr>)}
                        </tbody>




                    </table>
                </div>

            </div>
            <Toaster />

        </div>
    );
};

export default Favorite;