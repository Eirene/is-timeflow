"use client";
import { collection, getDocs } from "firebase/firestore";

import { db } from "./lib/firebase";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import TimeRecords from "./components/TimeRecords";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [error, setError] = useState("");

  const IconComponent = isRunning ? StopIcon : PlayIcon;

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);

    console.log("isRunning:", isRunning);
    console.log("selectedProjectId:", selectedProjectId);
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
        setSelectedProjectId(projectsData[0]?.id || "");
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to get projects. Please try again.");
      } finally {
        // setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-1">
          <select
            name="project"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="appearance-none col-start-1 row-start-1 pr-8 block w-full rounded-full bg-white dark:bg-slate-800 px-4 py-2.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-200 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 dark:focus:outline-sky-400 sm:text-sm/6"
          >
            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
                className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                {project.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4" />
        </div>
      </div>
      <div className="text-center">
        <div className="inline-flex items-center gap-4 p-4 pl-10 rounded-full bg-white dark:bg-slate-800 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]">
          <div className="text-4xl w-40 text-left text-sky-950 dark:text-slate-100">
            00:00:00
          </div>
          <div>
            <button
              type="button"
              onClick={handleTimerToggle}
              className="cursor-pointer size-20 rounded-full bg-linear-to-b from-sky-700 to-sky-500 text-white disabled:opacity-50 flex items-center justify-center hover:from-sky-500 hover:to-sky-500 transition-colors"
            >
              <IconComponent
                className={`size-10 ${!isRunning ? "translate-x-0.5" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <TimeRecords />
    </>
  );
}
