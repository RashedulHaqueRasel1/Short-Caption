import Swal from "sweetalert2";
import useAllCaption from "../../hook/useAllCaption";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { MdDeleteForever } from "react-icons/md";

const AllCaption = () => {


    const [allCaption, refetch] = useAllCaption();


    const axiosPublic = useAxiosPublic();

    // Delete favourite Data in User
    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure Favourite Data deleted ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/caption/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Favourite Data has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
            refetch()
        });
    }

    refetch()


    // console.log(allCaption)

    return (
        <div>

            <div className="overflow-x-auto">

                <table className="table mt-20 lg:mt-0">
                    {/* head */}
                    <thead>
                        <tr className="border border-blue-300 rounded-2xl font-bold  text-xs text-white">
                            <th>Caption</th>
                            <th>status</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allCaption?.map(caption => <tr key={caption._id} className=" bg-blue-200 hover:bg-blue-300 rounded-2xl">

                            <td className="text-black font-medium">
                                {caption.caption}
                            </td>

                            <td className="text-black font-medium">
                                {caption.status}
                            </td>


                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(caption?._id)} className="inline-flex items-center   justify-center w-full px-4 py-4 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black cursor-pointer"><MdDeleteForever /></button>
                            </td>

                        </tr>)}
                    </tbody>




                </table>
            </div>


        </div>
    );
};

export default AllCaption;