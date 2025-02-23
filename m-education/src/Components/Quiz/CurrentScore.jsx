import { useContext } from "react";
import DataContext from "../../Context/DataContext";

const CurrentScore = () => {
  const { score } = useContext(DataContext);
  return <div className="score">{score}</div>;
};

export default CurrentScore;
