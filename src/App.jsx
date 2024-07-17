import { useState } from "react";
import { useEffect } from "react";




const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};


const posts = [
  {
    post: "সব দিক দিয়ে একা হয়ে যাওয়ার ব্যাপার'টা আসলে'ই অনেক সুন্দর!🙂",
    status: "short"
  },
  {
    post: "জীবনে কোনো কিছুই সহজে আসে না, তবে কষ্ট করলে তবেই তা পাওয়া যায়।💪",
    status: "motivational"
  },
  {
    post: "আজকের দিনটি যতই কঠিন হোক না কেন, একদিন সব ঠিক হয়ে যাবে।🌈",
    status: "hopeful"
  },
  {
    post: "ভালোবাসা কখনোই হারিয়ে যায় না, শুধুমাত্র পরিবর্তন হয়।❤️",
    status: "love"
  },
  {
    post: "নতুন দিনে নতুন উদ্যমে শুরু করো, সাফল্য আসবেই।🚀",
    status: "inspirational"
  },
  {
    post: "স্বপ্ন দেখতে ভয় পেও না, কারণ স্বপ্নই তোমাকে এগিয়ে নিয়ে যাবে।🌟",
    status: "dream"
  },
  {
    post: "এতো ঝড় বৃষ্টির পরও যিনি রৌদ্রময় একটি দিন দিতে পারেন! তিনি আপনার যাবতীয় দুঃখ-কষ্টগুলোও এক নিমিষে দূর করতে পারেন! Trust Allah.'🤍",
    status: "dream"
  }
];



function App() {



  const [shuffledPosts, setShuffledPosts] = useState([]);

  useEffect(() => {
    setShuffledPosts(shuffleArray([...posts]));
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    });
  };

  const handleShare = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Share not supported on this browser, please copy the text instead.');
    }
  };


  return (
    <>
      <div>
        {shuffledPosts.map((post, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{post.post}</p>
            <button onClick={() => handleCopy(post.post)}>Copy</button>
            <button onClick={() => handleShare(post.post)}>Share</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
