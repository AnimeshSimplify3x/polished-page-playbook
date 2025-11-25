import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Users, 
  History, 
  UserCog, 
  LogOut,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Database, label: "Distributors", path: "/distributors" },
    { icon: History, label: "ETL History", path: "/etl-history" },
    { icon: Users, label: "Team Management", path: "/team" },
  ];

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">OSMOSYS 2.0</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <div className="mb-4">
          <p className="text-sm font-semibold text-sidebar-foreground mb-1">Profile</p>
        </div>
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <UserCog className="w-5 h-5" />
          <span className="font-medium">User Profile</span>
        </NavLink>
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-3"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
