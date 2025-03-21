import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";

const Result = () => {
  const { newQuiz, score, userName, handleActivityLog } =
    useContext(DataContext);

  const title = "My Quiz Result";
  const url = window.location.href;
  const text = (
    <p>
      Hi dear, i scored <span class="math-inline">${score}</span>
      {newQuiz.length * 5} on the Nola quiz app!
    </p>
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shared = await navigator.share({ title, url, text });
        console.log("shared successfully");
        return shared;
      } catch (error) {
        console.log("Failed to share!");
        alert("Failed to share!");
      }
    } else {
      console.log("Web Share API not supported.");
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (string) => {
    navigator.clipboard
      .writeText(string)
      .then(() => alert("Link copied to clipboard"))
      .catch((err) => console.log("Failed to copy", err));
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
