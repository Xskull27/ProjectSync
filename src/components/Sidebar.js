"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BugOff,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Folder,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Sidebar = ({ open = false, onClose }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Don't render sidebar on the home, login, and register pages
  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page after logout
    window.location.href = "/";
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: <Folder className="h-5 w-5" />,
    },
    {
      name: "Issues",
      href: "/dashboard/issues",
      icon: <BugOff className="h-5 w-5" />,
    },
  ];

  // Responsive sidebar: overlay on mobile, fixed on desktop
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-16 left-0 bottom-0 z-50 border-r transition-all duration-300 flex flex-col bg-background h-[calc(100vh-64px)]
          ${isCollapsed ? "w-16" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block
        `}
        style={{ boxShadow: open ? "0 2px 8px rgba(0,0,0,0.15)" : undefined }}
      >
        {/* Collapse Button & Close for mobile */}
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && <span className="text-lg font-bold">Welcome</span>}
          <div className="flex gap-2">
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {/* Collapse button for desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Collapse sidebar"
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "default"}
                    className={`w-full justify-${
                      isCollapsed ? "center" : "start"
                    } ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={onClose} // close sidebar on mobile after click
                  >
                    {item.icon}
                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        {/* User Info */}
        <div className="p-4 border-t mt-auto space-y-3">
          {!isCollapsed && user && (
            <div className="p-4 flex items-center gap-2 hover:bg-muted hover:cursor-pointer rounded-md">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs font-medium">{user.username}</div>
                <div className="text-xs text-muted-foreground">
                  {user.email} ({user.role})
                </div>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground hover:text-red-500 hover:border-red-200"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
