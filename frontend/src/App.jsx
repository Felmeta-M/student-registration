import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
