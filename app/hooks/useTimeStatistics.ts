import { useCallback, useState } from "react";
import { TimeRecord } from "../types/timeRecord";

export const useTimeStatistics = () => {
    const [dailyTotal, setDailyTotal] = useState(0);
    const [weeklyTotal, setWeeklyTotal] = useState(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);

    const calculateTotals = useCallback((records: TimeRecord[]) => {
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        ).getTime();
        const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay()),
        ).getTime();
        const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        ).getTime();

        let daily = 0;
        let weekly = 0;
        let monthly = 0;

        records.forEach((record) => {
            if (record.endTime >= startOfDay) daily += record.duration;
            if (record.endTime >= startOfWeek) weekly += record.duration;
            if (record.endTime >= startOfMonth) monthly += record.duration;
        });

        setDailyTotal(daily);
        setWeeklyTotal(weekly);
        setMonthlyTotal(monthly);
    }, []);

    return {
        dailyTotal,
        weeklyTotal,
        monthlyTotal,
        calculateTotals: calculateTotals,
    };
};
