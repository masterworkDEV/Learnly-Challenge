import React from "react";

const Buttons = ({ handleSubmit, handleRestart, verifyAnswer }) => {
  return (
    <div className="buttons">
      {verifyAnswer && (
        <>
          <button onClick={handleRestart}>
            <i class="bx bx-rotate-left"></i>
          </button>
          <button onClick={handleSubmit} className="submit-btn">
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default Buttons;
