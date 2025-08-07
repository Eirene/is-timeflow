"use client";
import { useProjectsStore } from "../store/projectsStore";
import { useRecordsStore } from "../store/recordsStore";
import { useEffect, useMemo, useState } from "react";

import Card from "./ui/Card";
import Initials from "./ui/Initials";
import TimeLog from "./TimeLog";

import { ProjectsSkeleton } from "../components/ProjectsSkeleton";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useTimeFormat } from "../hooks/useTimeFormat";
import { ButtonIcon } from "./ui/ButtonIcon";
import { Tabs } from "./ui/Tabs";

export default function TimeRecords() {
    const {
        projects,
        isLoading,
        error: projectError,
        subscribe,
    } = useProjectsStore();
    const {
        records,
        error: recordsError,
        subscribe: subscribeRecords,
    } = useRecordsStore();

    const { formatTime } = useTimeFormat();
    const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
        new Set(),
    );

    // Filter records based on selected period
    const filteredRecords = useMemo(() => {
        const now = new Date();
        let startTime: number;

        switch (activeTab) {
            case "day":
                startTime = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                ).getTime();
                break;
            case "week":
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
                startTime = startOfWeek.getTime();
                break;
            case "month":
                startTime = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1,
                ).getTime();
                break;
            default:
                startTime = 0;
        }

        return records.filter((record) => record.endTime >= startTime);
    }, [records, activeTab]);

    // Calculate total time for the selected period
    const totalTime = useMemo(() => {
        return filteredRecords.reduce(
            (total, record) => total + record.duration,
            0,
        );
    }, [filteredRecords]);

    // Subscription to Firestore updates with error handling
    useEffect(() => {
        try {
            const unsubscribe = subscribe();
            return () => unsubscribe();
        } catch (err) {
            console.error("Failed to subscribe to projects:", err);
        }
    }, [subscribe]);

    useEffect(() => {
        try {
            const unsubscribeRecords = subscribeRecords();
            return () => unsubscribeRecords();
        } catch (err) {
            console.error("Failed to subscribe to records:", err);
        }
    }, [subscribeRecords]);

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
    const displayError = projectError || recordsError;

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
                    <p>{formatTime(totalTime)}</p>
                </div>

                {/* Project Cards  */}

                {displayError && (
                    <p className="text-sm text-red-500">{displayError}</p>
                )}

                <div className="grid gap-2 mb-4">
                    {isLoading
                        ? <ProjectsSkeleton />
                        : projects.length > 0
                        ? projects.map((project) => {
                            const isExpanded = expandedProjects.has(project.id);
                            // Calculate project total for the filtered period
                            const projectTotal = filteredRecords
                                .filter((record) =>
                                    record.projectId === project.id
                                )
                                .reduce(
                                    (total, record) => total + record.duration,
                                    0,
                                );

                            return (
                                <div key={project.id} className="space-y-2">
                                    <Card>
                                        <div
                                            className="cursor-pointer flex gap-2 items-center"
                                            role="button"
                                            onClick={() =>
                                                toggleProjectExpansion(
                                                    project.id,
                                                )}
                                            title={isExpanded
                                                ? "Collapse project"
                                                : "Expand project"}
                                        >
                                            <ButtonIcon color="gray">
                                                <ChevronDownIcon
                                                    className={`size-5 transition-all duration-300 ease-in-out ${
                                                        isExpanded
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </ButtonIcon>

                                            <Initials name={project.name} />
                                            <h3>{project.name}</h3>

                                            <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap tracking-wide">
                                                {formatTime(projectTotal)}
                                            </p>

                                            {
                                                /* <ButtonIcon
                                                color="sky"
                                                title="Start timer"
                                            >
                                                <PlayIcon className="size-5 translate-x-px" />
                                            </ButtonIcon> */
                                            }
                                        </div>
                                    </Card>

                                    <TimeLog
                                        records={filteredRecords}
                                        projectId={project.id}
                                        isExpanded={isExpanded}
                                    />
                                </div>
                            );
                        })
                        : "No projects yet. Create one!"}
                </div>
            </div>
        </>
    );
}
