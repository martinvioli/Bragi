import { Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App;
