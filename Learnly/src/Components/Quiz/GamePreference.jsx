// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const GamePreference = ({
//   userName,
//   setUserName,
//   handleFormSubmission,
//   difficulty,
//   setDifficulty,
// }) => {
//   const [newDifficulty, setNewDifficulty] = useState("");

//   const handleDifficulty = (e) => {
//     setNewDifficulty(e);
//     console.log(newDifficulty);
//   };

//   return (
//     <>
//       <Link to="/" className="back-home">
//         <i class="bx bx-chevron-left"></i>
//         <span>Home</span>
//       </Link>
//       <main className="game-preference">
//         <form className="form" onSubmit={(e) => handleFormSubmission(e)}>
//           <label htmlFor="Name">Username</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your Username"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//           <select name="difficulty" id="difficulty">
//             <option value="">Select Difficulty</option>
//             {difficulty.length &&
//               difficulty.map((stage) => (
//                 <option
//                   key={stage}
//                   value={stage}
//                   onChange={(e) => handleDifficulty(e.target.value)}
//                 >
//                   {stage}
//                 </option>
//               ))}
//           </select>
//           <button>Continue to game</button>
//         </form>
//       </main>
//     </>
//   );
// };

// export default GamePreference;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const GamePreference = ({
  userName,
  setUserName,
  handleFormSubmission,
  difficulty,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  return (
    <>
      <Link to="/" className="back-home">
        <i className="bx bx-chevron-left"></i> {/* Use className, not class */}
        <span>Home</span>
      </Link>
      <main className="game-preference">
        <form className="form" onSubmit={(e) => handleFormSubmission(e)}>
          {" "}
          {/* Pass selectedDifficulty */}
          <label htmlFor="Name">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={selectedDifficulty} // Set the value of the select
            onChange={(e) => setSelectedDifficulty(e.target.value)} // Use the change handler
          >
            <option value="">Select Difficulty</option>
            {difficulty.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <button type="submit">Continue to game</button>{" "}
          {/* Add type="submit" */}
        </form>
      </main>
    </>
  );
};

export default GamePreference;
