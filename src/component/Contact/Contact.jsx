/* eslint-disable react/no-unescaped-entities */
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaFacebookF, FaPhoneVolume } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_6s3le57', 'template_qbt17cd', form.current, {
                publicKey: 'K6gr9H13_jRqj0pCS',
            })
            .then(
                () => {
                    Swal.fire({
                        title: "Massage Sent Success!",
                        text: "Thanks Your Feedback.",
                        icon: "success"
                    });
    
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };



    return (
        <div>

            <div className="text-clip">
                <h1 className="text-4xl lg:text-5xl lg:ml-[650px] lg:mt-32 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8954F7] to-[#ffff] inline-flex text-center">Contact Us</h1>
            </div>




            <div className="mt-10">
                <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl  ">
                    <div>


                        <div className="mt-12">
                            <h2 className="  text-white text-2xl font-bold">Email</h2>
                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-white   focus:ring-offset-2 focus:ring-indigo-600 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                                            viewBox="0 0 479.058 479.058">
                                            <path
                                                d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                                data-original="#000000" />
                                        </svg>
                                    </div>
                                    <a href="mailto:rashedulhaquerasel1@gmail.com" className="text-blue-300 text-sm ml-4">
                                        <strong>rashedulhaquerasel1@gmail.com</strong>
                                    </a>
                                </li>
                            </ul>

                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-white   focus:ring-offset-2 focus:ring-indigo-600 ">
                                        <FaPhoneVolume></FaPhoneVolume>
                                    </div>
                                    <a href="javascript:void(0)" className="text-blue-300 text-sm ml-4">
                                        <strong>+8801772582460</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <h2 className="  text-white text-2xl font-bold">Socials</h2>

                            <div className="lg:inline-flex inline-flex mt-4">
                                {/* GitHub */}
                                <NavLink to={'https://www.linkedin.com/in/rashedul-haque-rasel1/'} className='inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-white   focus:ring-offset-2 focus:ring-indigo-600 '> <RiLinkedinFill className="    text-xl"></RiLinkedinFill></NavLink>
                            </div>


                            <div className="lg:inline-flex inline-flex">
                                {/* GitHub */}
                                <NavLink to={'https://github.com/RashedulHaqueRasel1'} className='inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-white   focus:ring-offset-2 focus:ring-indigo-600 '> <BsGithub className="    text-xl"></BsGithub></NavLink>
                            </div>


                            <div className="lg:inline-flex inline-flex">
                                {/* Linkedin */}
                                <NavLink to={'https://www.facebook.com/Rashedul.haque.Rase1'} className='inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-white   focus:ring-offset-2 focus:ring-indigo-600 '> <FaFacebookF className="   text-xl"></FaFacebookF></NavLink>
                            </div>
                        </div>
                    </div>

                    <form className="ml-auo space-y-4" ref={form} onSubmit={sendEmail}>
                        <input type='text' name="user_name" placeholder='Name'
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
                        <input type='email' name="user_email" placeholder='Email'
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
                        <input type='text' placeholder='Subject'
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
                        <textarea name="message" placeholder='Message' rows="6"
                            className="w-full text-white rounded-md px-4 border text-sm pt-2.5 outline-blue-500"></textarea>
                        <button
                            className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full !mt-6" type="submit" value="Send">Send</button>
                    </form>
                </div>
            </div>




        </div>
    );
};

export default Contact;