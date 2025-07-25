"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCallback, useEffect, useState } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { useTimeTracking } from "../hooks/useTimeTracking";
import Select from "./ui/Select";

export default function TimeTracker() {
  const { isRunning, elapsedTime, startTimer, stopTimer } = useTimeTracking();
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [error, setError] = useState("");

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");
  }, []);

  const handleTimerToggle = useCallback(() => {
    if (!selectedProjectId) {
      setError("Please select a project first");
      return;
    }
    if (isRunning) {
      stopTimer();
    } else {
      startTimer(selectedProjectId);
    }
    setError("");
  }, [isRunning, selectedProjectId, startTimer, stopTimer]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name as string,
        }));
        setProjects(projectsData);
        setSelectedProjectId(projectsData[0]?.id || "");
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mx-auto w-full max-w-3xl">
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <Select
          items={projects.map((p) => ({ id: p.id, text: p.name }))}
          value={selectedProjectId}
          onChange={setSelectedProjectId}
          disabled={isRunning}
        />
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-4 p-4 pl-10 rounded-full bg-white dark:bg-slate-800 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]">
          <div className="text-4xl w-40 text-left text-sky-950 dark:text-slate-100">
            {formatTime(elapsedTime)}
          </div>
          <div>
            <button
              type="button"
              onClick={handleTimerToggle}
              disabled={!selectedProjectId}
              className={`cursor-pointer size-20 rounded-full text-white flex items-center justify-center transition-colors ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-b from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400"
              }`}
            >
              {isRunning
                ? <StopIcon className="size-10" />
                : <PlayIcon className="size-10 translate-x-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
