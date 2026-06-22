import { createContext, useContext, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { applicants as seedApplicants, jobs } from "./data/hiringData";
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Apply from "./pages/Apply";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import Dashboard from "./pages/Dashboard";
import Applicants from "./pages/Applicants";
import CandidateDetails from "./pages/CandidateDetails";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Pipeline from "./pages/Pipeline";
import Messages from "./pages/Messages";

const HiringContext = createContext(null);
export const useHiring = () => useContext(HiringContext);

function HiringProvider({ children }) {
  const [applicants, setApplicants] = useState(seedApplicants);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "applicant", title: "New application received", detail: "Aarav Mehta applied for Product Designer", time: "8 min" },
    { id: 2, type: "calendar", title: "Interview starting soon", detail: "Priya Nair · Frontend Engineer", time: "32 min" },
    { id: 3, type: "status", title: "Candidate moved to Shortlisted", detail: "Rohan Kapoor · Data Analyst", time: "1 hr" },
  ]);
  const [lastApplication, setLastApplication] = useState(null);

  const updateApplicant = (id, patch) => setApplicants((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  const deleteApplicant = (id) => setApplicants((items) => items.filter((item) => item.id !== id));
  const addApplicant = (data) => {
    const id = `APP-${new Date().getFullYear()}-${String(applicants.length + 41).padStart(4, "0")}`;
    const job = jobs.find((item) => item.id === Number(data.jobId)) || jobs[0];
    const newApplicant = {
      id, name: data.fullName, email: data.email, phone: data.phone, address: data.address,
      role: job.title, department: job.department, experience: data.experience || "0 years",
      currentCompany: data.currentCompany || "Not provided", currentSalary: data.currentSalary || "—",
      expectedSalary: data.expectedSalary || "—", notice: data.noticePeriod || "Immediate",
      education: data.education, skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
      status: "Applied", score: 58, applied: "Just now", source: "Careers page",
      location: job.location, avatar: data.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(),
      strengths: "", weaknesses: "", recommendedRole: job.title, notes: "New application — pending review.",
    };
    setApplicants((items) => [newApplicant, ...items]);
    setLastApplication(newApplicant);
    setNotifications((items) => [{ id: Date.now(), type: "applicant", title: "New application received", detail: `${data.fullName} applied for ${job.title}`, time: "Now" }, ...items]);
    return id;
  };

  const value = useMemo(() => ({ applicants, jobs, notifications, setNotifications, lastApplication, updateApplicant, deleteApplicant, addApplicant }), [applicants, notifications, lastApplication]);
  return <HiringContext.Provider value={value}>{children}</HiringContext.Provider>;
}

export default function App() {
  return (
    <HiringProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/apply/:jobId" element={<Apply />} />
            <Route path="/success" element={<ApplicationSuccess />} />
          </Route>
          <Route path="/hr" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="applicants/:id" element={<CandidateDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HiringProvider>
  );
}
