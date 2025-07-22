"use client";

import { SunIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
    const themeToggle = () => {
        // Check if the current theme is light
        const isLightTheme = document.documentElement.classList.contains(
            "light",
        );

        // Toggle the theme class
        document.documentElement.classList.toggle("light", !isLightTheme);
        document.documentElement.classList.toggle("dark", isLightTheme);

        // Update localStorage
        localStorage.setItem("theme", isLightTheme ? "dark" : "light");
    };

    return (
        <button
            onClick={themeToggle}
            className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-sky-100 hover:text-sky-50 hover:bg-white/10"
            title="Switch to light mode"
            aria-label="Switch to light mode"
        >
            <SunIcon className="size-5" />
        </button>
    );
}
