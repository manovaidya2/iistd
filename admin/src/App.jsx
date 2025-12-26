import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AdminSkillProgram from "./pages/AdminSkillProgram";
import Result from "./pages/Result";
import ViewResults from "./pages/ViewResults";
import AdminGallery from "./pages/AdminGallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactList from "./pages/ContactList";
import SkillProgramDetails from "./pages/SkillProgramDetails";

import ProgramListWithCourses from "./pages/ProgramListWithCourses";
import AdminAdmissionList from "./pages/AdminAdmissionList";
import ExaminationData from "./pages/ExaminationData";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin_skill" element={<Layout><AdminSkillProgram /></Layout>} />
          <Route path="/results" element={<Layout><Result /></Layout>} />
          <Route path="/view-results" element={<Layout><ViewResults /></Layout>} />
          <Route path="/admin-gallery" element={<Layout><AdminGallery /></Layout>} />
          <Route path="/contact-list" element={<Layout><ContactList /></Layout>} />
          <Route path="/skill-program-details" element={<Layout><SkillProgramDetails /></Layout>} />
          <Route path="/program-course"element={<Layout><ProgramListWithCourses /></Layout>} />
          <Route path="/admin-admission-list" element={<Layout><AdminAdmissionList /></Layout>} />
          <Route path="/examination-data" element={<Layout><ExaminationData /></Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* Move ToastContainer **outside Router** so it always exists */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
