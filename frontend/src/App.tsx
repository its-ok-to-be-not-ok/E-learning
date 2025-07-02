import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Homepage from './pages/Homepage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import ExplorePage from './pages/ExplorePage';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            {/* <Route path="/forgot-password" element={<AuthPage isForgot={true} />} /> */}
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
    
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/lesson" element={<LessonPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
        {/* Footer nếu cần */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
