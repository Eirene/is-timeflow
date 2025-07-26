"use client";

import { useCallback, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TimeRecord } from "../types/timeRecord";

export const useTimeTracking = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [runningProjectId, setRunningProjectId] = useState<string | null>(
        null,
    );
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const stopTimer = useCallback(async () => {
        if (!isRunning || !runningProjectId) return;

        setIsRunning(false);
        if (timerId) clearInterval(timerId);

        const endTime = Date.now();
        const duration = Math.floor(elapsedTime / 1000);

        const timeRecord: TimeRecord = {
            projectId: runningProjectId,
            startTime,
            endTime,
            duration,
            date: new Date(startTime).toISOString().split("T")[0],
        };

        try {
            await addDoc(collection(db, "records"), timeRecord);
        } catch (error) {
            console.error("Error saving time record:", error);
        }

        setRunningProjectId(null);
        setElapsedTime(0);
        setStartTime(0);
    }, [isRunning, runningProjectId, elapsedTime, startTime, timerId]);

    const startTimer = useCallback((projectId: string) => {
        if (isRunning) stopTimer();

        setIsRunning(true);
        setRunningProjectId(projectId);
        const now = Date.now();
        setStartTime(now);
        setElapsedTime(0);

        const id = setInterval(() => {
            setElapsedTime(Date.now() - now);
        }, 1000);

        setTimerId(id);
    }, [isRunning, stopTimer]);

    useEffect(() => {
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [timerId]);

    return {
        isRunning,
        runningProjectId,
        elapsedTime,
        startTimer,
        stopTimer,
    };
};
