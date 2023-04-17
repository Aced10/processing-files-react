import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/login/Login";
import UsersPage from "./pages/users/Users";
import FileProcessingPage from "./pages/fileProcessing/FileProcessing";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/file-processing" element={<FileProcessingPage />} />
      <Route path="*" element={<UsersPage />} />
    </Routes>
  );
}

export default App;
