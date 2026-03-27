import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import MoreInfo from "./components/MoreInfo";

export default function App() {
  return (
    <BrowserRouter basename="/hora/">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/more-info" element={<MoreInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
