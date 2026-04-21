import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  const { search, pathname } = useLocation();
  const showHomeShortcut = pathname !== "/" || search.length > 0;

  return (
    <div className="app-shell">
      <div className="app-glow app-glow--top"></div>
      <div className="app-glow app-glow--bottom"></div>

      {showHomeShortcut && (
        <Link to="/" className="home-shortcut">
          Home
        </Link>
      )}

      <main className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
