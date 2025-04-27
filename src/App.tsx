import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./app/views/Home";
import About from "./app/views/About";
import Notfound from "./app/views/404";

function App() {
  return (
    <>
      <Router>
        <nav className="flex items-center p-4 bg-violet-400 text-white space-x-5">
          <div className="text-3xl font-bold">JobPocket</div>
          <ul className="flex space-x-4 text-lg font-bold">
            <li>
              <NavLink
                to="jobpocket/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 underline" : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="jobpocket/about"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 underline" : ""
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="jobpocket/" element={<Home />} />
          <Route path="jobpocket/about" element={<About />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
