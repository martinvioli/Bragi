import { Routes, Route, useLocation } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import CreateUser from "./components/CreateUser";
import LandingPage from "./components/LandingPage";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<CreateUser />} />
          <Route
            exact
            path="/register/authenticate"
            element={<Authenticate />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
