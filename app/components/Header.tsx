import { ClockIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
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
                                    <div className="absolute inset-y-0 rounded-full bg-white/20 transition-all duration-300 ease-in-out">
                                    </div>
                                    <Link
                                        href="/"
                                        className="relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100
                           hover:text-sky-50"
                                        aria-current="page"
                                    >
                                        <span>TimeFlow</span>
                                    </Link>
                                    <Link
                                        href="/projects"
                                        className="relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100
                           hover:text-sky-50"
                                        aria-current="page"
                                    >
                                        <span>Projects</span>
                                    </Link>
                                    <Link
                                        href="/invoice"
                                        className="relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100
                           hover:text-sky-50"
                                        aria-current="page"
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
                        </div>
                        <div className="flex items-center">
                            <button
                                className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-sky-100 hover:text-sky-50 hover:bg-white/10"
                                title="Switch to light mode"
                                aria-label="Switch to light mode"
                            >
                                <SunIcon className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
