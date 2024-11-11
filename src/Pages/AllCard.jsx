import { useContext, useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import icon
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'react-share';


const ShareButtons = ({ url, title }) => (
  <div className="flex gap-2 mt-2">
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <EmailShareButton url={url} subject={title}>
      <EmailIcon size={32} round />
    </EmailShareButton>
    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  </div>
);


const AllCard = ({ allCaption }) => {

  const { user } = useContext(AuthContext)
  const navigation = useNavigate();
  const [showShareButtons, setShowShareButtons] = useState(false);
  const axiosSecure = useAxiosSecure();
  const utcDate = new Date();

  // Convert to BST (UTC+6)
  const offset = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const bstDate = new Date(utcDate.getTime() + offset);

  // Format the BST date to DD/MM/YYYY
  const day = String(bstDate.getUTCDate()).padStart(2, '0');
  const month = String(bstDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = bstDate.getUTCFullYear();
  const formattedBstDate = `${day}/${month}/${year}`;



  // copy Caption
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Text copied to clipboard!",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };




  //  Check User Login or Log out
  const handleFavoriteClick = () => {
    if (user) {
      addToFavorites(allCaption);
    } else {
      redirectToLogin();
    }
  };


  //user login than  Add to caption Favorite MongoDB Favorite collection
  const addToFavorites = async (allCaption) => {

    const userInfo = {
      caption: allCaption?.caption,
      date: formattedBstDate,
      email: user?.email,

    }
    const favorite = await axiosSecure.post(`/favorite`, userInfo)
    // console.log(favourite.data)
    if (favorite.data.insertedId) {
      // show success popup
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Favorite Added`,
        showConfirmButton: false,
        timer: 1500
      });
    }

  };

  // user not login , redirect to login page
  const redirectToLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Authentication Required",
      text: "Please log in to add Favorite.",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    navigation('/login')
  };


  const currentUrl = window.location.href;

  return (
    <div className=" ">

      <div className=" rounded-3xl bg-[#16233f] text-white  justify-center">

        <div className="p-6">
          <h2 className="text-xl text-center">
            {allCaption.caption}
          </h2>
          <div className="flex justify-center  mt-4">
            <div onClick={() => handleCopy(allCaption.caption)} className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer ">Copy</div>

            <div onClick={() => handleFavoriteClick(allCaption)} className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer ml-2"  ><BsSuitHeart /></div>

            <div>
              <div>
                <button className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer ml-2" onClick={() => setShowShareButtons(!showShareButtons)}>
                  {showShareButtons ? 'Close Share Options' : 'Share'}
                </button>
              </div>
              <div>
                {showShareButtons && <ShareButtons url={currentUrl} title={allCaption.caption} />}
              </div>

            </div>

          </div>
        </div>
      </div>


    </div>
  );
};

export default AllCard;