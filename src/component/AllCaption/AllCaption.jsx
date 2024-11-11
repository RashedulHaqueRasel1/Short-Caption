import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { MdDeleteForever } from "react-icons/md";
import useCaption from "../../hook/useCaption";

const AllCaption = () => {


    const [allCaption, refetch] = useCaption();


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

                axiosPublic.delete(`/adminCaption/${id}`)
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

    // Pending Status Approved
    const handleMakeStatus = (bio) => {
        // console.log(bio,'aaaaaaa')
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure This Caption is Approved?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/caption/approved/${bio?._id}`, { status: "Pending" })
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Caption Has been Approved.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
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
                            <th>Date</th>
                            <th>Number</th>
                            <th>Caption</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allCaption?.map(caption => <tr key={caption._id} className=" bg-blue-200 hover:bg-blue-300 rounded-2xl">

                            <td className="text-black font-medium">
                                {caption.createdDate}
                            </td>

                            <td className="text-black font-medium">
                                {caption.captionNumber}
                            </td>

                            <td className="text-black font-medium">
                                {caption.caption}
                            </td>


                            <td className="text-black font-medium">
                                {caption.email}
                            </td>

                            <td className="px-6 py-4">
                                {caption?.status === 'Pending' ? <button onClick={() => handleMakeStatus(caption)} className="inline-flex items-center   justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-red-500 hover:bg-transparent hover:outline hover:text-black cursor-pointer">{caption?.status || "Not Premium"}</button> : <button className="inline-flex items-center   justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-green-500 hover:bg-transparent hover:outline hover:text-black cursor-pointer">{caption?.status || "Not Premium"}</button>}
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