import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import useAxiosSecure from "../../useHook/useAxiosSecure";
import SocialLink from "../SocialLink/SocialLink";
 


const Registration = () => {

    const axiosPublic = useAxiosSecure();
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const { createUser, userUpdateProfile } = useContext(AuthContext);

    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        // console.log(data)

        const { email, password, photo } = data;

        // Password Lowe Case Upper Case & 6 characters check

        if (password.length < 6) {
            setErrorPassword("Password should be at least 6 characters or longer ")
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setErrorPassword("Your Password Should be Lower Case");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorPassword("Your Password Should be Upper Case");
            return;
        }


        // create User
        createUser(email, password)
            .then(result => {
                // console.log(result.user)
                console.log(result.user?.photoURL)

                userUpdateProfile(name, photo)
                    .then(() => {

                        // create user save Data in MongoDB
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                            password: data.password
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                // console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Registration Success!",
                                        text: "congratulations! Well Come Your Website.",
                                        icon: "success"
                                    });
                                }
                            })


                    })
                    .catch((error) => {
                        console.log(error)
                    })
                reset()

                navigation('/')


            })
            .catch(error => {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });

                console.error(error)
            })


        // console.log(info)

    }




    return (
        <div>

            <section className="py-16">

                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">


                    <div className="card shrink-0 w-full p-6 rounded-3xl lg:max-w-md max-w-sm shadow-2xl bg-[#16233f] border-2 border-blue-200      " style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>

                        <h1 className="text-center font-bold mb-10 text-3xl">Registration</h1>

                        <form className=" " onSubmit={handleSubmit(onSubmit)}>

                            {/* Name */}
                            <div className="flex flex-col">
                                <label className="label">
                                    <span className="  font-bold ">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered border rounded-3xl border-blue-300  mt-2"   {...register("name", { required: true })} />
                                {errors.name && <span className="text-red-600 font-bold">This field is required</span>}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col mt-3">
                                <label className="label">
                                    <span className="  font-bold ">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered border rounded-3xl border-blue-300  mt-2"   {...register("email", { required: true })} />
                                {errors.email && <span className="text-red-600 font-bold">This field is required</span>}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <label className="label mt-4">
                                    <span className="font-bold ">Password</span>
                                </label>
                                <label className="  flex items-center gap-2 input border-blue-300   mt-3  border rounded-3xl   ">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Your Password"
                                        name="password"
                                        // className="   "
                                        {...register("password", { required: true })}

                                    />

                                    <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer ">
                                        {
                                            showPassword ? <FaRegEye className="ml-7 lg:ml-28" /> : <FaRegEyeSlash className="ml-7 lg:ml-28" />
                                        }
                                    </span>

                                </label>
                                {
                                    errorPassword && <p className="text-red-600 font-bold mt-1">{errorPassword}</p>
                                }
                                {errors.password && <span className="text-red-600 font-bold">This field is required</span>}

                            </div>

                            {/* Photo */}
                            <div className="flex flex-col mt-3">
                                <label className="label">
                                    <span className="  font-bold ">Photo Url</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered border rounded-3xl border-blue-300  mt-2"   {...register("photo", { required: true })} />
                                {errors.photo && <span className="text-red-600 font-bold">This field is required</span>}
                            </div>

                            {/* Login button */}
                            <div className="mt-6 flex justify-center">
                                <button className="justify-center w-full px-7 py-4 text-[18px] font-bold rounded-full   bg-indigo-600   
                                p-4    hover:bg-transparent hover:outline text-black hover:text-black mr-3 mt-4">
                                    Registration</button>
                            </div>
                        </form>

                        <div className="text-center mt-4">--- OR ---</div>

                        <SocialLink></SocialLink>

                        <div className="mt-4 text-center">
                            <p className="text-[16px] font-medium">Already have an account?<Link to={'/login'} className="hover:text-indigo-600 font-bold text-blue-300"> Login</Link></p>
                        </div>

                    </div>



                </div >
            </section >

        </div>
    );
};

export default Registration;