import { Sidebar } from "@/components/ui/dashboard/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex h-screen bg-background">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
