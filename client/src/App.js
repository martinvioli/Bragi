import { Routes, Route, useLocation } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import CreateUser from "./components/CreateUser";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";
import Feed from "./components/Feed";
import DetailsAlbum from "./components/Details/DetailsAlbum";
import DetailsSong from "./components/Details/DetailsSong";
import DetailsArtist from "./components/Details/DetailsArtist";

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
          <Route path="/" element={<NavBar />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/feed" element={<Feed />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/song/:id" element={<DetailsSong />} />
            <Route exact path="/artist/:id" element={<DetailsArtist />} />
            <Route exact path="/album/:id" element={<DetailsAlbum />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
