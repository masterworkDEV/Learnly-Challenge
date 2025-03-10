import Layout from "./Pages/Layout";
import { DataProvider } from "./Context/DataContext";

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Layout />
      </DataProvider>
    </div>
  );
};

export default App;
