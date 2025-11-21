import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  onClick: () => void;
  icon?: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  activeTab: string;
  className?: string;
  isMobile?: boolean;
}

export function NavBar({ items, activeTab, className, isMobile = false }: NavBarProps) {
  return (
    <div className={cn("flex items-center gap-1 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;

        return (
          <button
            key={item.name}
            onClick={item.onClick}
            className={cn(
              "relative cursor-pointer text-sm font-medium px-4 sm:px-6 py-2 rounded-full transition-colors",
              "text-foreground/80 hover:text-primary",
              isActive && "text-primary"
            )}
          >
            {Icon && isMobile ? (
              <Icon size={18} strokeWidth={2.5} />
            ) : (
              <span>{item.name}</span>
            )}
            {isActive && (
              <motion.div
                layoutId="lamp"
                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                  <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                  <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                </div>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}
