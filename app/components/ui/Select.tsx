"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SelectItem = {
    id: string;
    text: string;
};

type SelectProps = {
    label?: string;
    items: SelectItem[];
    value?: string | number;
    name?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

export default function Select({
    label,
    items,
    value = "",
    name = "",
    placeholder = "Choose an option",
    onChange,
    className = "",
    disabled = false,
}: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="mb-2 flex gap-2 pl-2 text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                    {label}
                </label>
            )}
            <div className="grid grid-cols-1">
                <select
                    value={value}
                    name={name}
                    onChange={handleChange}
                    disabled={disabled}
                    className="appearance-none col-start-1 row-start-1 pr-8 block w-full rounded-full bg-white dark:bg-slate-800 px-4 py-2.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-200 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 dark:focus:outline-sky-400 sm:text-sm/6"
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {items.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                            className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                        >
                            {item.text}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4" />
            </div>
        </div>
    );
}
