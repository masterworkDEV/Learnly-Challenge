import { useState, useContext, createContext } from "react";

const DataContext = createContext({});

export const DataSuppy = ({ children }) => {
  const [quiz, setQuiz] = useState([]);

  <DataContext.Provider value={(quiz, setQuiz)}>
    {children}
  </DataContext.Provider>;
};

export default DataContext;
