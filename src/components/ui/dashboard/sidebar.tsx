import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Users,
  HelpCircle,
  BarChart3,
  Archive,
  Sidebar as SidebarIcon,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const mainMenu = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: ClipboardList, label: "Exams", href: "/dashboard/exams" },
  { icon: Users, label: "Students" },
  { icon: FileText, label: "Results" },
  { icon: BarChart3, label: "Analytics" },
  { icon: HelpCircle, label: "Support" },
  { icon: Archive, label: "Archive" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string | undefined) => {
    if (!href) return false;
    return location.pathname === href;
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-[280px] border-r border-border bg-card flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-foreground" />
          </div>
        </div>
        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
          <SidebarIcon className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Main Menu Section */}
      <div className="px-4 flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Main Menu
        </p>
        <nav className="flex flex-col gap-1">
          {mainMenu.map((item) => (
            <button
              key={item.label}
              onClick={() => item.href && navigate(item.href)}
              disabled={!item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                isActive(item.href)
                  ? "bg-yellow-100 text-foreground font-medium"
                  : "text-foreground/80 hover:bg-accent",
                !item.href && "opacity-50 cursor-not-allowed",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <button onClick={logout} className="text-left p-2 hover:text-red-400">
        Logout
      </button>
    </aside>
  );
}
