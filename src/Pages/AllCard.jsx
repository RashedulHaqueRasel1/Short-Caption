// import { useEffect, useState } from "react";

import Swal from "sweetalert2";


// Share Caption

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

import { useContext, useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import useAxiosSecure from "../useHook/useAxiosSecure";



const ShareButtons = ({ url, title }) => (
  <div className="share-buttons">
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
  // console.log(user)
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
      // alert(''); 
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Text copied to clipboard!",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };






  // Add to Faviouret mongoDB Faviouret collection

  const handleAddFavorite = async (allCaption) => {
    // console.log(bio)

    const userInfo = {
      caption: allCaption?.caption,
      date: formattedBstDate,
      status: 'Pending',
      email: user?.email,

    }
    const favorite = await axiosSecure.post(`/favorite`, userInfo)
    // console.log(favourite.data)
    if (favorite.data.insertedId) {
      // show success popup
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Favourite Added`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    // refetch()
  }




  const currentUrl = window.location.href;

  return (
    <div className="mt-6 ">

      <div className="card bg-[#16233f] text-white  justify-center">

        <div className="card-body">
          <h2 className="card-title text-xl text-center">
            {allCaption.caption}
          </h2>
          <div className="card-actions justify-center mt-4">
            <div onClick={() => handleCopy(allCaption.caption)} className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer">Copy</div>
            {
              user ? <>
                <div onClick={() => handleAddFavorite(allCaption)} className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer"><BsSuitHeart /></div>
              </>
                :
                <></>
            }
            <button className="badge badge-outline p-5 hover:bg-indigo-600 cursor-pointer" onClick={() => setShowShareButtons(!showShareButtons)}>
              {showShareButtons ? 'Close Share Options' : 'Share'}
            </button>
            {showShareButtons && <ShareButtons url={currentUrl} title={allCaption.caption} />}


          </div>
        </div>
      </div>


    </div>
  );
};

export default AllCard;