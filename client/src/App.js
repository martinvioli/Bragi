import { Routes, Route } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import CreateUser from "./components/CreateUser";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<CreateUser />} />
        <Route exact path="/register/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default App;
