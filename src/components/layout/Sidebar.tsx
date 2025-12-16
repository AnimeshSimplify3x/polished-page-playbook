import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  FileText, 
  CheckCircle,
  Beer
} from "lucide-react";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const Sidebar = () => {
  const { open } = useSidebar();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Reconciliation Dashboard", path: "/" },
    { icon: Package, label: "SKU Mapping", path: "/sku-mapping" },
    { icon: Store, label: "Outlet Mapping", path: "/outlet-mapping" },
    { icon: FileText, label: "License Mapping", path: "/license-mapping" },
    { icon: CheckCircle, label: "Outlet Approvals", path: "/outlet-approvals" },
  ];

  return (
    <SidebarRoot className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Beer className="w-6 h-6 text-primary-foreground" />
            </div>
            {open && <h1 className="text-xl font-bold text-sidebar-foreground">BREWERY PORTAL</h1>}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {open && <span className="font-medium">{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};

export default Sidebar;
