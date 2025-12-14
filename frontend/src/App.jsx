import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home1 from "./Home1";
import "./App.css";
import Create from "./Create";
import Read from "./Read";
import Edit from "./Edit";
const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
