import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";

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

  const title = "My Quiz Result";
  const text = `I scored <span class="math-inline">${score}</span>${
    newQuiz.length * 5
  } on the Nola quiz app!`;
  const url = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log("Web Share API not supported.");
      // You can implement a fallback here (see below)
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

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
        <button onClick={handleShare}>Share</button>
        <button onClick={handleActivityLog}>Back Home</button>
      </div>
    </div>
  );
};

export default Result;
