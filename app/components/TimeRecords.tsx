"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import Card from "./ui/Card";
import { ProjectsSkeleton } from "../components/ProjectsSkeleton";

import {
    CalendarDaysIcon,
    ChevronDownIcon,
    ClockIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";
import Initials from "./ui/Inititals";
import { useTimeFormat } from "../hooks/useTimeFormat";
import { ButtonIcon } from "./ui/ButtonIcon";
import { Tabs } from "./ui/Tabs";

export default function TimeRecords() {
    const { formatTime } = useTimeFormat();
    const [projects, setProjects] = useState<{ id: string; name: string }[]>(
        [],
    );
    const [records, setRecords] = useState<{
        id: string;
        projectId: string;
        startTime: number;
        endTime: number;
        duration: number;
        date: string;
    }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
        new Set(),
    );

    const toggleProjectExpansion = (projectId: string) => {
        setExpandedProjects((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(projectId)) {
                newSet.delete(projectId);
            } else {
                newSet.add(projectId);
            }
            return newSet;
        });
    };

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
                console.log("Fetched projects:", projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to get projects. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        // Reset error state
        setError("");
        const fetchRecords = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "records"),
                );
                const recordsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    projectId: doc.data().projectId as string,
                    startTime: doc.data().startTime as number,
                    endTime: doc.data().endTime as number,
                    duration: doc.data().duration as number,
                    date: doc.data().date as string,
                }));
                setRecords(recordsData);
                console.log("Fetched time records:", recordsData);
            } catch (error) {
                console.error("Error fetching time records:", error);
                setError("Failed to get time records. Please try again.");
            }
        };

        fetchRecords();
    }, []);

    return (
        <>
            <div className="mx-auto w-full max-w-3xl">
                <Tabs
                    tabs={[
                        { id: "day", label: "Day" },
                        { id: "week", label: "This Week" },
                        { id: "month", label: "This Month" },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(tabId) =>
                        setActiveTab(tabId as "day" | "week" | "month")}
                />
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
                <div className="grid gap-2 mb-4">
                    {loading
                        ? <ProjectsSkeleton />
                        : projects.length > 0
                        ? projects.map((project) => {
                            const isExpanded = expandedProjects.has(project.id);
                            return (
                                <div key={project.id} className="space-y-2">
                                    <Card>
                                        <div className="flex gap-2 items-center">
                                            <ButtonIcon
                                                color="gray"
                                                onClick={() =>
                                                    toggleProjectExpansion(
                                                        project.id,
                                                    )}
                                                title="Expand"
                                            >
                                                <ChevronDownIcon
                                                    className={`size-5 transition-all duration-300 ease-in-out ${
                                                        isExpanded
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </ButtonIcon>

                                            <Initials>P</Initials>
                                            <h3>{project.name}</h3>

                                            {records.length > 0 &&
                                                    records.some(
                                                        (record) =>
                                                            record.projectId ===
                                                                project.id,
                                                    )
                                                ? (
                                                    <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap tracking-wide">
                                                        {formatTime(
                                                            records
                                                                .filter(
                                                                    (record) =>
                                                                        record
                                                                            .projectId ===
                                                                            project
                                                                                .id,
                                                                )
                                                                .reduce(
                                                                    (
                                                                        total,
                                                                        record,
                                                                    ) => total +
                                                                        record
                                                                            .duration,
                                                                    0,
                                                                ),
                                                        )}
                                                    </p>
                                                )
                                                : (
                                                    <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap tracking-wide">
                                                        0h 0m 0s
                                                    </p>
                                                )}

                                            <ButtonIcon
                                                color="sky"
                                                title="Start timer"
                                            >
                                                <PlayIcon className="size-5 translate-x-px" />
                                            </ButtonIcon>
                                        </div>
                                    </Card>

                                    {records.length > 0
                                        ? (
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                    isExpanded
                                                        ? "max-h-96"
                                                        : "max-h-0"
                                                }`}
                                            >
                                                <div className="bg-white dark:bg-slate-800 py-2 rounded-3xl space-y-2 overflow-hidden">
                                                    {records
                                                        .filter((record) =>
                                                            record.projectId ===
                                                                project.id
                                                        )
                                                        .map((record) => (
                                                            <div
                                                                key={record.id}
                                                                className="flex items-center gap-2 pl-4 pr-14 py-2 hover:bg-gray-50 dark:hover:bg-slate-700"
                                                            >
                                                                <CalendarDaysIcon className="text-gray-400 size-5" />
                                                                <span className="flex-1 text-gray-400  tracking-wide">
                                                                    {record
                                                                        .date}
                                                                </span>

                                                                <ClockIcon className="text-gray-400 size-5" />

                                                                <span className=" text-gray-700 dark:text-gray-300 tracking-wide w-20">
                                                                    {formatTime(
                                                                        record
                                                                            .duration,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )
                                        : ""}
                                </div>
                            );
                        })
                        : "No projects yet. Create one!"}
                </div>
            </div>
        </>
    );
}
