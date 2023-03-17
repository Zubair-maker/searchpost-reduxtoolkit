import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./componets/CreatePost";
import FetchPost from "./componets/FetchPost";

function App() {
  return (
    <div className="container-fluid">
      <h1 className="text-center text-light bg-dark">Search Post/Create Post</h1>
      <div className="container">
        <Routes>
          <Route path="/" element={<FetchPost />} />
          <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
