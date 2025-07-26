import { useTimeFormat } from "../hooks/useTimeFormat";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function TimeLog({
    records,
    projectId,
    isExpanded,
}: {
    records: {
        id: string;
        projectId: string;
        date: string;
        duration: number;
    }[];
    projectId: string;
    isExpanded: boolean;
}) {
    const { formatTime } = useTimeFormat();

    if (!records.length) return null;

    return (
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-96" : "max-h-0"
            }`}
        >
            <div className="bg-white dark:bg-slate-800 py-2 rounded-3xl space-y-2 overflow-hidden">
                {records
                    .filter((record) => record.projectId === projectId)
                    .map((record) => (
                        <div
                            key={record.id}
                            className="flex items-center gap-2 pl-4 pr-14 py-2 hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                            <CalendarDaysIcon className="text-gray-400 size-5" />
                            <span className="flex-1 text-gray-400 tracking-wide">
                                {record.date}
                            </span>
                            <ClockIcon className="text-gray-400 size-5" />
                            <span className="text-gray-700 dark:text-gray-300 tracking-wide w-20">
                                {formatTime(record.duration)}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
