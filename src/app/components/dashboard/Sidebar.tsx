import { useNavigate, useLocation } from "react-router";
import { Home, Upload, Pill, Activity, MessageSquare, Settings, LogOut, Heart } from "lucide-react";
import { cn } from "../components/ui/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload Report", path: "/upload-report" },
  { icon: Pill, label: "Medications", path: "/medications" },
  { icon: Activity, label: "Symptoms", path: "/symptoms" },
  { icon: MessageSquare, label: "Chat Assistant", path: "/chat" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-cyan-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              HealthHero
            </h1>
            <p className="text-xs text-muted-foreground">Health Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                isActive
                  ? "bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 shadow-sm"
                  : "text-muted-foreground hover:bg-cyan-50/50 hover:text-cyan-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-cyan-600")} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-cyan-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
