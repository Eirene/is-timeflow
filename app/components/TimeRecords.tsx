"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import Card from "./ui/Card";
import { ProjectsSkeleton } from "../components/ProjectsSkeleton";

import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";
import Initials from "./ui/Inititals";

export default function TimeRecords() {
    const [projects, setProjects] = useState<{ id: string; name: string }[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Reset error state
        setError("");
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name as string,
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to get projects. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
    return (
        <>
            <div className="mx-auto w-full max-w-3xl">
                <nav
                    className="relative flex bg-white dark:bg-slate-800 ring-1 ring-gray-200 dark:ring-gray-600 rounded-full p-2 justify-between *:flex-1 *:cursor-pointer"
                    aria-label="Tabs"
                >
                    <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-700 dark:text-gray-200">
                        Today
                    </button>
                    <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        This Week
                    </button>
                    <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        This Month
                    </button>
                </nav>
            </div>
            <div className="mx-auto w-full max-w-3xl p-px overflow-y-auto space-y-2">
                <div className="flex justify-end items-center gap-1 text-xs pr-4">
                    <span className="text-gray-600 dark:text-gray-400">
                        Total:
                    </span>
                    <p>0h 0m 0s</p>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Project Cards  */}
                {loading
                    ? <ProjectsSkeleton />
                    : projects.length > 0
                    ? projects.map((project) => (
                        <Card key={project.id}>
                            <div className="flex gap-2 items-center">
                                <button
                                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-400 hover:bg-sky-50 dark:text-gray-500 dark:hover:bg-slate-700"
                                    title="Expand"
                                >
                                    <ChevronDownIcon className="size-5" />
                                </button>

                                <Initials>P</Initials>
                                <h3>{project.name}</h3>
                                <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                    0h 0m 0s
                                </p>
                                <button
                                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sky-600 hover:text-sky-800 hover:bg-sky-50 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-slate-700"
                                    title="Start timer"
                                >
                                    <PlayIcon className="size-5 translate-x-px" />
                                </button>
                            </div>
                        </Card>
                    ))
                    : "No projects yet. Create one!"}
            </div>
        </>
    );
}
