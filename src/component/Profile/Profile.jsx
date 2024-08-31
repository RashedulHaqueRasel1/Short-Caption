import useProfile from "../../hook/useProfile";


const Profile = () => {

    const [profile] = useProfile();

    return (
        <div className="px-2 py-4 flex flex-col justify-center items-center text-center ">
            <div className=" mt-40 mb-28 lg:mt-24 lg:mb-96 border border-blue-400 p-8 rounded-2xl">

                <img src={profile.photo} className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-32 w-32  " alt="Short Caption" />
                <h1 className="text-2xl text-gray-500 font-bold mt-6">
                    {profile.name}
                </h1>
                <h2 className="text-base md:text-xl text-gray-500 font-bold mt-2">
                    {profile.email}
                </h2>


            </div>
        </div>
    );
};

export default Profile;