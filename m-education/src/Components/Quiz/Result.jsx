import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";

// function ShareButton({ title, text, url }) {
//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title,
//           text,
//           url,
//         });
//         console.log('Shared successfully!');
//       } catch (error) {
//         console.error('Error sharing:', error);
//       }
//     } else {
//       // Fallback for browsers that don't support Web Share API
//       console.log('Web Share API not supported.');
//       // You can implement a fallback here (see below)
//       copyToClipboard(url);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//         alert("Link copied to clipboard!");
//     }, (err) => {
//         console.error('Failed to copy: ', err);
//     });
//   };

//   return <button onClick={handleShare}>Share</button>;
// }

// export default ShareButton;

// function ShareButton({ title, text, url }) {
//   // ... (Web Share API code from above) ...

//   const copyToClipboard = (text) => {
//     if (navigator.clipboard && window.isSecureContext) {
//       navigator.clipboard.writeText(text).then(() => {
//         alert("Link copied to clipboard!");
//       }, (err) => {
//         console.error('Failed to copy: ', err);
//       });
//     } else {
//       // Older browsers fallback
//       const textArea = document.createElement("textarea");
//       textArea.value = text;
//       textArea.style.position = "absolute";
//       textArea.style.left = "-999999px";
//       document.body.prepend(textArea);
//       textArea.select();

//       try {
//           document.execCommand('copy');
//           alert("Link copied to clipboard!");
//       } catch (error) {
//           console.error('Failed to copy', error);
//       } finally {
//           textArea.remove();
//       }
//     }
//   };

//   return <button onClick={handleShare}>Share</button>;
// }

// export default ShareButton;

// import React from 'react';
// import ShareButton from './ShareButton'; // Adjust path

// function MyComponent() {
//   const shareData = {
//     title: 'Check out this awesome content!',
//     text: 'This is a description of the content.',
//     url: 'https://www.example.com/my-content',
//   };

//   return (
//     <div>
//       {/* Your content */}
//       <ShareButton {...shareData} />
//     </div>
//   );
// }

// export default MyComponent;

const Result = () => {
  const {
    newQuiz,
    setScore,
    score,
    userName,
    setCurrentQuestion,
    setSelectedOption,
    setShowResult,
    setVerifyAnswer,
    setTimeLeft,
    setConfirmExit,
    handleActivityLog,
  } = useContext(DataContext);

  return (
    <div className="showresult">
      <div
        className="progress-circle"
        style={
          typeof score === "number" && {
            background: `conic-gradient(
  #096a4df7 0%,
  #096a4df7 ${score}%, 
  #43b99758 ${score}%,
  #43b99758 100% 
)`,
          }
        }
      >
        <div className="progress-circle-inner">
          <div className="progress-text score">
            <span className="final-score text">You Score</span>
            <h4 className="final-score score">
              {score}/{newQuiz.length * 5}
            </h4>
          </div>
        </div>
      </div>
      <div className="message">
        <span className="congrats">Congratulations</span>
        <p className="name">
          Great job, <b>{userName}!</b> You Did it.
        </p>
      </div>

      <div className="buttons">
        <button>Share</button>
        <button onClick={handleActivityLog}>Back Home</button>
      </div>
    </div>
  );
};

export default Result;
