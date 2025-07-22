"use client";

import { ClockIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    const navClass =
        "relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100 hover:text-sky-50";
    const navActiveClass = "bg-white/20 rounded-full";
    return (
        <header>
            <nav className="bg-linear-to-b from-sky-700 to-sky-500 text-sky-50 tracking-wide">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <ClockIcon className="text-sky-50 size-8" />
                            </div>
                            <div className="ml-4">
                                <div className="relative flex gap-2">
                                    <Link
                                        href="/"
                                        className={`${navClass} ${
                                            pathname === "/"
                                                ? navActiveClass
                                                : ""
                                        }`}
                                        aria-current={pathname === "/"
                                            ? "page"
                                            : undefined}
                                    >
                                        <span>TimeFlow</span>
                                    </Link>
                                    <Link
                                        href="/projects"
                                        className={`${navClass} ${
                                            pathname === "/projects"
                                                ? navActiveClass
                                                : ""
                                        }`}
                                        aria-current={pathname === "/projects"
                                            ? "page"
                                            : undefined}
                                    >
                                        <span>Projects</span>
                                    </Link>
                                    <Link
                                        href="/invoice"
                                        className={`${navClass} ${
                                            pathname === "/invoice"
                                                ? navActiveClass
                                                : ""
                                        }`}
                                        aria-current={pathname === "/invoice"
                                            ? "page"
                                            : undefined}
                                    >
                                        <span className="hidden xs:inline">
                                            Create Invoice
                                        </span>
                                        <span className="xs:hidden">
                                            Invoice
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
