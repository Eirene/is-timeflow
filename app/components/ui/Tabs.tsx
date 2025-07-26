interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);

    return (
        <nav
            className="relative flex bg-white dark:bg-slate-800 ring-1 ring-gray-200 dark:ring-gray-600 rounded-full p-2 justify-between *:flex-1 *:cursor-pointer"
            aria-label="Tabs"
        >
            {/* Active background (animated) */}
            <div
                className="absolute inset-y-2 rounded-full px-3 py-2 bg-gray-100 dark:bg-slate-700 transition-all duration-300 ease-in-out"
                style={{
                    width:
                        `calc(100% / ${tabs.length} - 1rem / ${tabs.length})`,
                    transform: `translateX(calc(${activeIndex} * 100%))`,
                }}
            />

            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                            ? "text-gray-700 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
