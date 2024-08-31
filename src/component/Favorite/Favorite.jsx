import { MdDeleteForever } from "react-icons/md";
import useAllFavorite from "../../hook/useAllFavorite";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useHook/useAxiosSecure";

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




    return (
        <div className="mx-auto container mb-20">


            <div className="overflow-x-auto">

                <table className="table mt-20 lg:mt-0">
                    {/* head */}
                    <thead>
                        <tr className="border border-blue-300 rounded-2xl font-bold  text-xs text-white">
                            <th>Date</th>
                            <th>Caption</th>
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
                                <button onClick={() => handleDelete(favorite?._id)} className="inline-flex items-center   justify-center w-full px-4 py-4 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black cursor-pointer"><MdDeleteForever /></button>
                            </td>

                        </tr>)}
                    </tbody>




                </table>
            </div>


        </div>
    );
};

export default Favorite;