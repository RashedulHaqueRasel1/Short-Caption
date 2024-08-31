import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SocialLink from "../SocialLink/SocialLink";



const Login = () => {


    const { signIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");

    const navigation = useNavigate();



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()




    const onSubmit = (data) => {

        const { email, password } = data;

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

        // console.log(data)

        // signIn User 
        signIn(email, password)
            .then(result => {
                const logInUser = result.user;
                console.log(logInUser)
                Swal.fire({
                    title: "LogIn Success!",
                    text: "Congratulations! Well Come Your Website.",
                    icon: "success"
                });

                navigation('/')


            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            })

    }


    return (
        <div>

            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">


                <div className="card shrink-0 w-full p-6 max-w-sm shadow-2xl bg-[#16233f] border-2 border-blue-200  rounded-3xl  mt-20 lg:mt-20  " style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>

                    <h1 className="text-center font-bold mb-10 text-3xl">Login your account</h1>

                    <form className=" " onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="label">
                                <span className="font-bold ">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered border rounded-3xl border-blue-300    mt-2"   {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-600 font-bold">This field is required</span>}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="label mt-4">
                                <span className="font-bold ">Password</span>
                            </label>
                            <label className="  flex items-center gap-2 border-blue-300   mt-3 input  border rounded-3xl   ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    // className="   "
                                    {...register("password", { required: true })}

                                />

                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer ">
                                    {
                                        showPassword ? <FaRegEye className="ml-7 lg:ml-16" /> : <FaRegEyeSlash className="ml-7 lg:ml-16" />
                                    }
                                </span>

                            </label>
                            {
                                errorPassword && <p className="text-red-600 font-bold mt-1">{errorPassword}</p>
                            }
                            {errors.password && <span className="text-red-600 font-bold">This field is required</span>}

                            {/* Forget Pass */}
                            <label className="label mt-4">
                                <a href="#" className="label-text-alt text-[16px] link link-hover font-bold ">Forgot password?</a>
                            </label>
                        </div>

                        {/* Login button */}
                        <div className="mt-6 flex justify-center">
                            <button className="justify-center w-full px-7 py-4 text-[18px] font-bold rounded-full   bg-indigo-600   
            p-4    hover:bg-transparent hover:outline text-black hover:text-black mr-3 mt-4
            ">Login</button>
                        </div>
                    </form>

                    <div className="text-center mt-4">--- OR ---</div>

                    <SocialLink></SocialLink>

                    <div className="mt-4 text-center">
                        <p className="text-[16px] font-medium">Don’t have an account? <Link to={'/registration'} className="hover:text-indigo-600 font-bold text-blue-300">Registration</Link></p>
                    </div>

                </div>

            </div >

        </div>
    );
};

export default Login;