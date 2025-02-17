import React from "react";

const Buttons = ({ handleSubmit, handleRestart, checkedAnswer }) => {
  return (
    <div className="buttons">
      {checkedAnswer && (
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
