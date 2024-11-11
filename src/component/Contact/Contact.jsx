import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaFacebookF, FaPhoneVolume } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contact = () => {
    const form = useRef();

    // State to track form inputs
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_subject: '',
        message: ''
    });


    // Update form data as user types
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_6s3le57', 'template_qbt17cd', form.current, 'K6gr9H13_jRqj0pCS')
            .then(
                () => {
                    Swal.fire({
                        title: "Message Sent Success!",
                        text: "Thanks for your feedback.",
                        icon: "success"
                    });
                    // Clear form fields after submission
                    setFormData({ user_name: '', user_email: '', user_subject: '', message: '' });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div>
            <div className="text-clip">
                <h1 className="text-4xl lg:text-5xl mt-28 ml-24 lg:ml-[770px] lg:mt-28 font-bold bg-clip-text text-transparent text-white inline-flex text-center">Contact Us</h1>
            </div>

            <div className="lg:mb-48">
                <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl">
                    <div>
                        {/* Contact Information Section */}
                        <div className="mt-12">
                            <h2 className="text-white text-2xl font-bold">Email</h2>
                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="inline-flex items-center justify-center p-2 ml-6 text-base font-bold leading-6 text-blue-300 border-transparent rounded-full outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none hover:text-white focus:ring-offset-2 focus:ring-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff' viewBox="0 0 479.058 479.058">
                                            <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                                        </svg>
                                    </div>
                                    <a href="mailto:rashedulhaquerasel1@gmail.com" className="text-blue-200 text-sm ml-4 hover:underline">
                                        <strong>rashedulhaquerasel1@gmail.com</strong>
                                    </a>
                                </li>
                            </ul>
                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="inline-flex items-center justify-center p-2   ml-6 text-base font-bold leading-6 text-blue-300  border-transparent rounded-full md:w-auto outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none  hover:text-black    focus:ring-offset-2 focus:ring-indigo-600 ">
                                        <FaPhoneVolume></FaPhoneVolume>
                                    </div>
                                    <a href="https://api.whatsapp.com/send/?phone=8801772582460" target='_blank' className="text-blue-200 text-sm ml-4 hover:underline">
                                        <strong>+8801772582460</strong> - (WhatsApp)
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-white text-2xl font-bold mb-4">Socials</h2>
                            {/* Social Icons */}
                            <NavLink to={'https://www.linkedin.com/in/rashedul-haque-rasel1/'} className='inline-flex items-center justify-center p-2 ml-6 text-base font-bold leading-6 text-blue-300 border-transparent rounded-full outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none hover:text-white focus:ring-offset-2 focus:ring-indigo-600'>
                                <RiLinkedinFill className="text-xl" />
                            </NavLink>
                            <NavLink to={'https://github.com/RashedulHaqueRasel1'} className='inline-flex items-center justify-center p-2 ml-6 text-base font-bold leading-6 text-blue-300 border-transparent rounded-full outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none hover:text-white focus:ring-offset-2 focus:ring-indigo-600'>
                                <BsGithub className="text-xl" />
                            </NavLink>
                            <NavLink to={'https://www.facebook.com/Rashedul.haque.Rase1'} className='inline-flex items-center justify-center p-2 ml-6 text-base font-bold leading-6 text-blue-300 border-transparent rounded-full outline outline-offset-2 outline-1 outline-blue-300 hover:bg-blue-300 hover:outline-none hover:text-white focus:ring-offset-2 focus:ring-indigo-600'>
                                <FaFacebookF className="text-xl" />
                            </NavLink>
                        </div>
                    </div>

                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <input type='text' name="user_name" placeholder='Name' value={formData.user_name} onChange={handleInputChange}
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" required/>
                        <input type='email' name="user_email" placeholder='Email' value={formData.user_email} onChange={handleInputChange}
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" required/>
                        <input type='subject' name="user_subject" placeholder='Subject' value={formData.user_subject} onChange={handleInputChange}
                            className="w-full text-white rounded-md py-2.5 px-4 border text-sm outline-blue-500" required/>
                        <textarea name="message" placeholder='Message' rows="6" value={formData.message} onChange={handleInputChange}
                            className="w-full text-white rounded-md px-4 border text-sm pt-2.5 outline-blue-500" required></textarea>
                        <button
                            className="text-white bg-blue-500  hover:outline hover:bg-transparent rounded-md text-sm px-4 py-3 w-full mt-6"
                            type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
