import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";



const AddCaption = () => {

    const axiosPublic = useAxiosPublic();

    // React hook From
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        console.log(data)

        const story = await axiosPublic.post(`/captionAdd`, data)
        console.log(story.data)
        if (story.data.insertedId) {
            // show success popup
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `Caption Added Success`,
                showConfirmButton: false,
                timer: 1500
            });

        
        }


    }

    return (
        <div className="  mx-auto container   " style={{ boxShadow: 'box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}    >

            <div className="shadow-2xl bg-base-100   p-10 space-y-6 rounded-xl container mx-auto   border-red-500" style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}  >

                <label className="label  ">
                    <span className="label-text text-2xl font-bold text-center md:ml-48 lg:ml-[650px]">Add Job</span>
                </label>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                    <div className="lg:flex justify-center">

                        <div className="space-y-1 text-sm" data-aos="fade-up" data-aos-duration="2200">
                            <label className="label">
                                <span className="label-text   font-bold">Caption</span>
                            </label>
                            <div  >
                                <textarea type="textarea" name="caption" placeholder="Write Caption" className="input input-bordered border rounded-xl border-blue-300 w-full mt-2"   {...register("caption", { required: true })}></textarea>
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