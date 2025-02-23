import { useContext } from "react";
import DataContext from "../../Context/DataContext";

const CurrentScore = () => {
  const { score = 0 } = useContext(DataContext); // Provide a default value

  return (
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
        <span className="progress-text">{score}</span>
      </div>
    </div>
  );
};

export default CurrentScore;
