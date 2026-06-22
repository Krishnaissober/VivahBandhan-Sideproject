import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard-shell">
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
      <main className="dashboard-main"><DashboardHeader openMenu={() => setSidebarOpen(true)} /><div className="dashboard-content"><Outlet /></div></main>
    </div>
  );
}
