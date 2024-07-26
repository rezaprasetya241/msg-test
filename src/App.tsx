import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/Home_Page";
import DashboardPage from "./pages/layout";
import MeetingPage from "./pages/meeting/Meeting_Page";
import CreateMeetingPage from "./pages/meeting/create-meeting/Create_Meating_Page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route index element={<HomePage />} />
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="/meeting/create" element={<CreateMeetingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
