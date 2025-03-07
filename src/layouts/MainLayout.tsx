
import React from "react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/hooks/useTheme";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <ThemeProvider>
      <div className="flex flex-col w-screen h-screen overflow-hidden bg-background">
        <Header />
        <main className={cn("flex-1 overflow-hidden", className)}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
