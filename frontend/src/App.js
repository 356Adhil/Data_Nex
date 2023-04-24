import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ImageUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
