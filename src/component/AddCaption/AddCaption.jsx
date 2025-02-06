import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/Provider/AuthProvider";



const AddCaption = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { email } = user;
    // React hook From
    const { register, handleSubmit, formState: { errors },reset  } = useForm();



    // Date & Time
    const [time, setTime] = useState("");

    // Function to update the time
    const updateTime = () => {
        const currentDate = new Date();

        // Format options for 12-hour time with AM/PM and date as DD/MM/YYYY
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // 12-hour clock format with AM/PM
            day: '2-digit', // Day as 2 digits
            month: '2-digit', // Month as 2 digits
            year: 'numeric', // Full year
            timeZone: 'Asia/Dhaka', // Bangladesh time zone (BST)
        };

        // Get the formatted date and time
        const bangladeshTime = currentDate.toLocaleString('en-US', options);

        // Format the output to match the desired pattern
        const formattedDateTime = `${bangladeshTime.slice(11)}, ${bangladeshTime.slice(0, 10)}`;

        setTime(formattedDateTime);
    };

    // Update time every second
    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        updateTime(); // Call immediately to set the initial time

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);


    const onSubmit = async (data) => {
        // console.log(data)
        const info = {
            caption: data.caption,
            type: data.status,
            email: email,
            createdDate: time,
            status: "Pending",
        }
        console.log(info)

        const story = await axiosPublic.post(`/captionAdd`, info)
        // console.log(story.data)
        if (story.data.insertedId) {
            // show success popup
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `Caption Added Success`,
                text: "Wating For Admin Approved.",
                showConfirmButton: false,
                timer: 1500
            });

            reset();


        }


    }

    return (
        <div className="  mx-auto container   " style={{ boxShadow: 'box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}    >

            <div className="shadow-2xl bg-base-100   p-10 space-y-6 rounded-xl container mx-auto   border-red-500" style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}  >

                <label className="label  ">
                    <span className="label-text text-2xl font-bold text-center md:ml-48 lg:ml-[650px]">Add Your Own Caption</span>
                </label>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                    <div className="lg:flex justify-center">

                        <div className="space-y-1 text-sm" data-aos="fade-up" data-aos-duration="2200">
                            <label className="label">
                                <span className="label-text   font-bold">Caption</span>
                            </label>
                            <div  >
                                <textarea type="textarea" name="caption" placeholder="Write Your Caption" className="input input-bordered border rounded-xl border-blue-300 w-full  "   {...register("caption", { required: true })}></textarea>
                                {errors.caption && <span className="text-red-600 font-bold  ">This field is required</span>}

                            </div>

                        </div>

                        <div className="space-y-1 text-sm" data-aos="fade-up" data-aos-duration="2200">
                            <label className="label">
                                <span className="label-text font-bold lg:ml-4">Category</span>
                            </label>
                            <select className="select select-primary w-full lg:ml-4  lg:w-[600px] *: border-blue-300   focus:dark:border-blue-500 " name="country" id="country" {...register("status", { required: true })}>
                                <option disabled selected>Category</option>
                                <option>Short</option>
                                <option>Long</option>

                            </select>
                            {errors.status && <span className="text-red-600 font-bold">This field is required</span>}
                        </div>

                    </div>


                    <button className="btn w-full hover:outline text-[16px] bg-indigo-600 hover:bg-transparent text-white hover:text-black mr-3"  >Added Caption</button>

                </form>






            </div >





        </div >
    );
};

export default AddCaption;