import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // Home component import
import StudentLogin from "./components/StudentLogin";
import InspirationSection from "./Home/InspirationSection"; // InspirationSection component import
import SkillDevelopmentPage from "./About/SkillDevelopmentPage";
// import VerifyCenterCode from "./About/VerifyCenterCode";
import SkillDevelopmentPrograms from "./Home/SkillDevelopmentPrograms";
import Center_login from "./Institute_Zone/Center_login";
import VerifyCenterCode from "./Institute_Zone/VerifyCenterCode";
import ApplicationForm from "./components/ApplicationForm";
import StudentZoneLogin from "./Student Zone/StudentZoneLogin";
import OnDemandRegistration from "./Student Zone/OnDemandRegistration";
import CandidateThroughTrainingForm from "./Student Zone/CandidateThroughTrainingForm";
import SelectExamDate from "./Student Zone/SelectExamDate";
import ApplyFranchisee from "./Franchise/ApplyFranchisee";
import ContactUs from "./pages/ContactUs";
import SkillProgramDetails from "./components/SkillProgramDetails";
import ScrollToTop from "./components/ScrollToTop";
import AdmissionForm from "./Student Zone/AdmissionForm";
import ExaminationForm from "./Student Zone/ExaminationForm";
import FormDownloadComponent from "./Student Zone/FormDownloadComponent";


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/results" element={<StudentLogin/>} /> {/* Student Login route */}
        <Route path="/inspiration" element={<InspirationSection />} /> 
        <Route path="/skill-development" element={<SkillDevelopmentPage/>} /> {/* Fallback route */}
        <Route path="/affiliations" element={<VerifyCenterCode />} /> {/* Fallback route */}
        <Route path="/skilldevelopmentprogram" element={<SkillDevelopmentPrograms />} /> 
        <Route path="/center-login" element={<Center_login />} /> 
        <Route path="/verifycentercode" element={<VerifyCenterCode />} /> 
        <Route path="/application-form" element={<ApplicationForm />} /> 
        <Route path="/student-login" element={<StudentZoneLogin />} /> 
        <Route path="/onDemand-registration" element={<OnDemandRegistration />} /> 
        <Route path="/Candidate-TrainingForm" element={<CandidateThroughTrainingForm />} />
        <Route path="/select-exam-date" element={<SelectExamDate />} /> {/* Fallback route */}
        <Route path="/applyfranchisee" element={<ApplyFranchisee />} /> {/* Fallback route */}
        <Route path="/contact-us" element={<ContactUs />} /> {/* Fallback route */}
        <Route path="/admission-form" element={<AdmissionForm />} />
        <Route path="/examination-form" element={<ExaminationForm />} />
        <Route path="/form-download" element={<FormDownloadComponent />} />
         <Route
          path="/skill-programs/:id"
          element={<SkillProgramDetails />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
