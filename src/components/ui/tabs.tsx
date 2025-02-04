import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  className?: string;
};

type TabProps = {
  label: string;
  isActive: boolean;
  className?: string;
  onClick: () => void;
};

const Tab = ({ label, isActive, onClick, className }: TabProps) => {
  return (
    <div
      className={cn(
        className,
        isActive
          ? "border-b-[3px] text-white   border-b-purple-500 pb-2"
          : "cursor-pointer  hover:bg-white/10 ",
        "transition-all flex border-r text-nowrap items-center h-full px-5 py-3 text-sm font-medium"
      )}
      onClick={onClick}
    >
      <h3>{label}</h3>
    </div>
  );
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  center?: boolean;
};

export const Tabs = ({ tabs, activeTab, onTabClick }: TabsProps) => {
  return (
    <div className="flex w-full">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          className={tab.className}
          isActive={activeTab === tab.id}
          onClick={() => onTabClick(tab.id)}
        />
      ))}
    </div>
  );
};
