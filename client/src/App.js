import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
